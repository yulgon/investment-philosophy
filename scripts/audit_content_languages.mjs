import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const docsRoot = new URL('../docs/', import.meta.url)
const englishRoot = new URL('../docs/en/', import.meta.url)

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return entry.name === 'en' ? [] : markdownFiles(path)
    return extname(entry.name) === '.md' ? [path] : []
  }))
  return nested.flat()
}

const findings = []
const koreanFiles = await markdownFiles(docsRoot.pathname)

for (const koreanFile of koreanFiles) {
  const path = relative(docsRoot.pathname, koreanFile)
  const englishFile = join(englishRoot.pathname, path)
  try {
    await readFile(englishFile, 'utf8')
  } catch {
    findings.push(`Missing English counterpart: ${path}`)
  }
}

for (const englishFile of await markdownFiles(englishRoot.pathname)) {
  const content = await readFile(englishFile, 'utf8')
  content.split('\n').forEach((line, index) => {
    if (/[가-힣]/.test(line)) {
      findings.push(`Hangul remains in English page: ${relative(englishRoot.pathname, englishFile)}:${index + 1}`)
    }
    if (/href="\/(?!en\/)(?:philosophy|strategy|stay-the-course|books|wiki)(?:\/|")/.test(line)) {
      findings.push(`English page links to Korean route: ${relative(englishRoot.pathname, englishFile)}:${index + 1}`)
    }
  })
}

if (findings.length) {
  console.error('Language-content audit failed:\n')
  console.error(findings.join('\n'))
  process.exitCode = 1
} else {
  console.log('Language-content audit passed.')
}
