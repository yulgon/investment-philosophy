import { readdir, readFile } from 'node:fs/promises'
import { extname, join, relative } from 'node:path'

const docsRoot = new URL('../docs/', import.meta.url)
const prohibited = [
  /항상 우월한? 성과/i,
  /확실하게 보장/i,
  /완벽(?:히|하게) (?:환율|손실|위험|리스크|변동성).{0,20}(?:제거|통제|방어)/i,
  /(?:수익률|장기 수익).{0,20}90% 이상.{0,20}(?:결정|증명)/i,
  /^(?!.*(?:아니|아닙|않))(?:.*)(?:유일한|오직 하나의).{0,20}(?:투자법|과학적 원리)/i,
  /(?:반드시|확실히).{0,20}(?:시장.{0,8}이긴|초과 ?수익)/i,
  /엄청난 초과 ?수익/i,
  /always yields superior results/i,
  /reliably guarantee/i,
  /perfectly (?:eliminates?|controls?|avoids?) (?:currency|loss|risk|volatility)/i,
  /(?:returns?|performance).{0,20}(?:90%).{0,20}(?:determines?|proves?)/i,
  /(?:the )?only scientific principle/i,
  /will always (?:beat|outperform) the market/i,
  /massive excess returns/i,
]

const editorialSurface = /^(?:title:|excerpt:|description:|#{1,4}\s)/
const prohibitedEditorialPhrases = [
  /궁극의 (?:생존 공식|방패|퀀트 머신|대응)/i,
  /완벽 가이드/i,
  /쏠림을 지배/i,
  /가치.{0,12}팩터의 증명/i,
  /실적이 나오는 확실한 기업/i,
  /수학적 증명/i,
  /ultimate (?:survival formula|shield|quant machine|response)/i,
  /perfect (?:guide|shield)/i,
  /sharpest spear.{0,20}dominat/i,
  /proof of the value factor/i,
  /mathematical proof/i,
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
    const isOverconfidentClaim = prohibited.some((pattern) => pattern.test(line))
    const isOverstatedEditorialSurface = editorialSurface.test(line)
      && prohibitedEditorialPhrases.some((pattern) => pattern.test(line))
    if (isOverconfidentClaim || isOverstatedEditorialSurface) {
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
