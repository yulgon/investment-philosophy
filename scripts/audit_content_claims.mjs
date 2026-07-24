import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const docsRoot = new URL('../docs/', import.meta.url)
const prohibited = [
  /항상 우월한? 성과/i,
  /확실하게 보장/i,
  /완벽(?:히|하게) (?:환율|손실|위험|리스크|변동성).{0,20}(?:제거|통제|방어)/i,
  /(?:수익률|장기 수익).{0,20}90% 이상.{0,20}(?:결정|증명)/i,
  /always yields superior results/i,
  /reliably guarantee/i,
  /perfectly (?:eliminates?|controls?|avoids?) (?:currency|loss|risk|volatility)/i,
  /(?:returns?|performance).{0,20}(?:90%).{0,20}(?:determines?|proves?)/i,
]

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return markdownFiles(path)
    return extname(entry.name) === '.md' ? [path] : []
  }))
  return nested.flat()
}

const rootPath = docsRoot.pathname
const findings = []

for (const file of await markdownFiles(rootPath)) {
  const lines = (await readFile(file, 'utf8')).split('\n')
  lines.forEach((line, index) => {
    if (prohibited.some((pattern) => pattern.test(line))) {
      findings.push(`${relative(rootPath, file)}:${index + 1}: ${line.trim()}`)
    }
  })
}

if (findings.length) {
  console.error('Potentially overconfident financial claims found:\n')
  console.error(findings.join('\n'))
  process.exitCode = 1
} else {
  console.log('Content-claim audit passed.')
}
