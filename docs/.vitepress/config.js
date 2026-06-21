import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/investment-philosophy/',
  title: "나의 투자 철학 아카이브",
  description: "시간이 흘러도 변하지 않는 나만의 투자 원칙과 전략을 기록하는 공간입니다.",
  lang: 'ko-KR',
  themeConfig: {
    logo: '/logo.png', // Optional, can be added later
    nav: [
      { text: '홈', link: '/' },
      { text: '투자 철학', link: '/philosophy/principles' },
      { text: '자산 배분', link: '/philosophy/allocation' },
      { text: '독서 노트', link: '/books/' }
    ],
    sidebar: {
      '/philosophy/': [
        {
          text: '투자 철학 & 원칙',
          items: [
            { text: '서문 (Introduction)', link: '/philosophy/intro' },
            { text: '기본 핵심 원칙', link: '/philosophy/principles' },
            { text: '보글헤드 10대 철학', link: '/philosophy/bogleheads' },
            { text: '자산 배분 전략', link: '/philosophy/allocation' },
            { text: '투자 심리와 마인드셋', link: '/philosophy/psychology' }
          ]
        }
      ],
      '/books/': [
        {
          text: '독서 노트',
          items: [
            { text: '도서 목록 전체', link: '/books/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com' } // Placeholder or user can update
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present'
    },
    search: {
      provider: 'local'
    }
  }
})
