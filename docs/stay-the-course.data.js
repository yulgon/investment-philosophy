import { createContentLoader } from 'vitepress'

export default createContentLoader('stay-the-course/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .filter(({ url }) => url !== '/stay-the-course/')
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || '제목 없음',
        url,
        excerpt: frontmatter.excerpt || '',
        date: frontmatter.date || '',
        tags: frontmatter.tags || []
      }))
      .sort((a, b) => {
        const timeA = new Date(a.date).getTime()
        const timeB = new Date(b.date).getTime()
        if (timeB === timeA) {
          return b.url.localeCompare(a.url) // 같은 날짜일 경우 파일명 역순 (최신 번호가 먼저 오도록)
        }
        return timeB - timeA
      })
  }
})
