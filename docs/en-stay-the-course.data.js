import { createContentLoader } from 'vitepress'

export default createContentLoader('en/stay-the-course/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .filter(({ url }) => url !== '/en/stay-the-course/')
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title || 'Untitled',
        url,
        excerpt: frontmatter.excerpt || '',
        date: frontmatter.date || '',
        tags: frontmatter.tags || []
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
})
