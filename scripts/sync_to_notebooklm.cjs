const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Target notebook title
const TARGET_NOTEBOOK_TITLE = 'Investment Philosophy';

// Root directory of the project
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Gather markdown files
function getFilesToSync() {
  const files = [];

  // 1. Root files
  const rootFiles = ['Core&Satellite.md', 'Evolvability.md'];
  for (const filename of rootFiles) {
    const fullPath = path.join(PROJECT_ROOT, filename);
    if (fs.existsSync(fullPath)) {
      files.push({
        relativePath: filename,
        fullPath
      });
    }
  }

  // 2. docs/ files recursively
  const docsDir = path.join(PROJECT_ROOT, 'docs');
  if (fs.existsSync(docsDir)) {
    function walk(dir) {
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          // Exclude internal/special folders
          if (file !== '.vitepress' && file !== 'node_modules' && file !== 'public') {
            walk(fullPath);
          }
        } else if (file.endsWith('.md')) {
          const relativePath = path.relative(PROJECT_ROOT, fullPath);
          files.push({
            relativePath,
            fullPath
          });
        }
      }
    }
    walk(docsDir);
  }

  return files;
}

// MCP Connection helper class
class NotebookLmMcpClient {
  constructor() {
    this.mcpProcess = null;
    this.buffer = '';
    this.id = 1;
    this.pendingRequests = new Map();
  }

  start() {
    return new Promise((resolve, reject) => {
      // Spawn MCP server using node environment
      this.mcpProcess = spawn('/Users/yg/.node-env/bin/node', [
        '/Users/yg/.node-env/bin/npx',
        '-y',
        '@m4ykeldev/notebooklm-mcp',
        'serve'
      ], {
        env: {
          ...process.env,
          PATH: '/Users/yg/.node-env/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin'
        }
      });

      this.mcpProcess.stdout.on('data', (data) => {
        this.buffer += data.toString();
        let lineEnd;
        while ((lineEnd = this.buffer.indexOf('\n')) !== -1) {
          const line = this.buffer.slice(0, lineEnd).trim();
          this.buffer = this.buffer.slice(lineEnd + 1);
          if (line) {
            try {
              const message = JSON.parse(line);
              if (message.id && this.pendingRequests.has(message.id)) {
                const { resolveReq, rejectReq } = this.pendingRequests.get(message.id);
                this.pendingRequests.delete(message.id);
                if (message.error) {
                  rejectReq(new Error(JSON.stringify(message.error)));
                } else {
                  resolveReq(message.result);
                }
              }
            } catch (e) {
              // Ignore non-json stdout noise
            }
          }
        }
      });

      this.mcpProcess.stderr.on('data', (data) => {
        // Log stderr for diagnostic purposes
        console.error('[MCP Server Log]', data.toString().trim());
      });

      this.mcpProcess.on('close', (code) => {
        console.log(`[MCP Server] Process exited with code ${code}`);
      });

      // Simple handshake sequence
      this.sendRequest('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        clientInfo: { name: 'PhilosophySyncScript', version: '1.0.0' }
      }).then(() => {
        this.sendNotification('notifications/initialized', {});
        resolve();
      }).catch(reject);
    });
  }

  sendRequest(method, params) {
    const reqId = this.id++;
    const payload = {
      jsonrpc: '2.0',
      id: reqId,
      method,
      params
    };
    const promise = new Promise((resolveReq, rejectReq) => {
      this.pendingRequests.set(reqId, { resolveReq, rejectReq });
    });
    this.mcpProcess.stdin.write(JSON.stringify(payload) + '\n');
    return promise;
  }

  sendNotification(method, params) {
    const payload = {
      jsonrpc: '2.0',
      method,
      params
    };
    this.mcpProcess.stdin.write(JSON.stringify(payload) + '\n');
  }

  async callTool(name, args = {}) {
    const res = await this.sendRequest('tools/call', {
      name,
      arguments: args
    });

    if (res.isError) {
      const errorText = res.content && res.content[0] ? res.content[0].text : 'Unknown error';
      throw new Error(`Tool ${name} failed: ${errorText}`);
    }

    // Try to parse text content as JSON if it represents a JSON payload
    if (res.content && res.content[0] && res.content[0].text) {
      try {
        return JSON.parse(res.content[0].text);
      } catch (e) {
        return res.content[0].text;
      }
    }
    return res;
  }

  close() {
    if (this.mcpProcess) {
      this.mcpProcess.kill();
    }
  }
}

async function sync() {
  console.log('=== Starting NotebookLM Documentation Sync ===');

  const files = getFilesToSync();
  console.log(`Found ${files.length} markdown files to sync.`);
  for (const f of files) {
    console.log(` - ${f.relativePath}`);
  }

  const client = new NotebookLmMcpClient();
  try {
    console.log('\nConnecting to NotebookLM MCP server...');
    await client.start();
    console.log('Successfully connected and initialized.');

    // 1. Get list of notebooks
    console.log('\nRetrieving notebooks list...');
    const listRes = await client.callTool('notebook_list');
    
    // Check if error was returned
    if (listRes.status === 'error') {
      throw new Error(listRes.error || 'Failed to retrieve notebooks.');
    }

    const notebooks = listRes.notebooks || [];
    let targetNotebook = notebooks.find(n => n.title === TARGET_NOTEBOOK_TITLE);
    let notebookId;

    if (targetNotebook) {
      console.log(`Found existing notebook "${TARGET_NOTEBOOK_TITLE}" with ID: ${targetNotebook.id}`);
      notebookId = targetNotebook.id;
    } else {
      console.log(`Notebook "${TARGET_NOTEBOOK_TITLE}" not found. Creating it...`);
      const createRes = await client.callTool('notebook_create', { title: TARGET_NOTEBOOK_TITLE });
      if (createRes.status === 'error') {
        throw new Error(createRes.error || 'Failed to create notebook.');
      }
      notebookId = createRes.notebook.id;
      console.log(`Successfully created notebook with ID: ${notebookId}`);
    }

    // 2. Get existing sources in this notebook to avoid duplicates
    console.log('\nRetrieving notebook details and existing sources...');
    const notebookDetails = await client.callTool('notebook_get', { notebook_id: notebookId });
    if (notebookDetails.status === 'error') {
      throw new Error(notebookDetails.error || 'Failed to get notebook details.');
    }

    const existingSources = notebookDetails.notebook?.sources || [];
    console.log(`Found ${existingSources.length} existing sources in the notebook.`);

    // Map source title to source_id for quick lookup
    const sourceTitleMap = new Map();
    for (const source of existingSources) {
      sourceTitleMap.set(source.title, source.id);
    }

    // 3. Upload/Update files
    console.log('\nUploading documents...');
    for (const file of files) {
      const title = file.relativePath;
      const content = fs.readFileSync(file.fullPath, 'utf8');

      // Check if source already exists
      if (sourceTitleMap.has(title)) {
        const oldSourceId = sourceTitleMap.get(title);
        console.log(`Updating "${title}" (deleting old source ${oldSourceId} first)...`);
        const delRes = await client.callTool('source_delete', {
          notebook_id: notebookId,
          source_id: oldSourceId,
          confirm: true
        });
        if (delRes.status === 'error') {
          console.warn(`⚠️ Warning: Failed to delete old source "${title}":`, delRes.error);
        }
      }

      console.log(`Uploading "${title}"...`);
      const uploadRes = await client.callTool('notebook_add_text', {
        notebook_id: notebookId,
        title,
        content
      });

      if (uploadRes.status === 'error') {
        console.error(`❌ Error uploading "${title}":`, uploadRes.error);
      } else {
        console.log(`✅ Successfully uploaded "${title}".`);
      }
    }

    console.log('\n=== Sync completed successfully! ===');

  } catch (err) {
    console.error('\n❌ Sync failed with error:', err.message || err);
  } finally {
    client.close();
  }
}

sync();
