import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: "원빌리언달러 도네이션",
  description: "투자는 과정일 뿐, 목적지는 세상에 대한 기여입니다. 원빌리언달러 기부를 향한 자산 설계 아카이브.",
  lang: 'ko-KR',
  themeConfig: {
    logo: '/logo.png', // Optional, can be added later
    nav: [
      { text: '홈', link: '/' },
      { text: '투자 철학', link: '/philosophy/intro' },
      { text: '투자 전략', link: '/strategy/' },
      { text: '독서 노트', link: '/books/' },
      { text: 'Stay the Course', link: '/stay-the-course/' }
    ],
    sidebar: {
      '/philosophy/': [
        {
          text: '투자 철학 & 원칙',
          items: [
            { text: '서문 (Introduction)', link: '/philosophy/intro' },
            { text: '기본 핵심 원칙', link: '/philosophy/principles' },
            { text: '보글헤드 10대 철학', link: '/philosophy/bogleheads' },
            { text: '나의 투자 연혁 (History)', link: '/philosophy/history' },
            { text: '투자 심리와 마인드셋', link: '/philosophy/psychology' }
          ]
        }
      ],
      '/strategy/': [
        {
          text: '투자 전략',
          items: [
            { text: '투자 전략 개요 (Overview)', link: '/strategy/' },
            { text: '1. KCA 적립식 전략', link: '/strategy/kca' },
            { text: '2. 자산 배분 & 운영 전략', link: '/strategy/allocation' },
            { text: '3. 자동 투자 전략', link: '/strategy/auto-investment' },
            { text: '4. ETF 선정 및 도구 가이드', link: '/strategy/how-to-choose' }
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
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
        },
        link: 'mailto:one.billion.dollar.donation@gmail.com'
      }
    ],
    footer: {
      message: '#18년차직장인 #KCA #자동매매투자자 #여유시간은두딸과함께 — stay the course 🌿 &nbsp;·&nbsp; <a href="/privacy">개인정보처리방침</a>',
      copyright: 'Copyright © 2026-present · 본 사이트의 모든 내용은 개인 기록이며 투자 권유가 아닙니다.'
    },
    search: {
      provider: 'local'
    }
  }
})
