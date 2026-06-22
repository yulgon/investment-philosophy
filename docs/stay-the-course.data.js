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
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }
})
