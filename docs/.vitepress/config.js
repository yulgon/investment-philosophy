import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    base: '/',
    sitemap: {
      hostname: 'https://one-billion-donation.com'
    },
    head: [
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:url', content: 'https://one-billion-donation.com/' }],
      ['meta', { property: 'og:title', content: '원빌리언달러 도네이션' }],
      ['meta', { property: 'og:description', content: '투자는 과정일 뿐, 목적지는 세상에 대한 기여입니다. 원빌리언달러 기부를 향한 자산 설계 아카이브.' }],
      ['meta', { name: 'naver-site-verification', content: 'e52fe99e70ff96372bd79bd9be9697ece2d96795' }],
      // [TODO] 애드센스 코드를 발급받으면 아래 주석을 풀고 client ID를 변경해서 사용하세요.
      // ['script', { async: '', src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX', crossorigin: 'anonymous' }],
      
      // [TODO] 구글 애널리틱스(GA4) 추적 코드를 발급받으면 아래 주석을 풀고 G-XXXXXXXXXX 를 변경해서 사용하세요.
      ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-Z7Y0N822TN' }],
      ['script', {}, "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-Z7Y0N822TN');"],
      
      // 언어 자동 리다이렉트 스크립트 (Option A)
      ['script', {}, `
        (function() {
          if (typeof window === 'undefined') return;
          if (!localStorage.getItem('lang-redirect-done')) {
            localStorage.setItem('lang-redirect-done', 'true');
            var lang = navigator.language || navigator.userLanguage;
            if (lang && !lang.toLowerCase().startsWith('ko') && !window.location.pathname.startsWith('/en/')) {
              window.location.href = '/en' + (window.location.pathname === '/' ? '/' : window.location.pathname);
            }
          }
        })();
      `]
    ],
    themeConfig: {
      logo: '/logo.png',
      search: {
        provider: 'local'
      }
    },
    locales: {
      root: {
        label: '한국어',
        lang: 'ko-KR',
        title: "원빌리언달러 도네이션",
        description: "투자는 과정일 뿐, 목적지는 세상에 대한 기여입니다. 원빌리언달러 기부를 향한 자산 설계 아카이브.",
        themeConfig: {
          socialLinks: [
            {
              icon: {
                svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
              },
              link: '/contact'
            }
          ],
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
                  { 
                    text: '보글헤드 10대 철학', 
                    link: '/philosophy/bogleheads',
                    items: [
                      { text: '투자 계획 수립', link: '/philosophy/investment-planning' }
                    ]
                  },
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
                  { text: '2. 자동 투자 전략', link: '/strategy/auto-investment' },
                  { text: '3. 자산 배분 & 운영 전략', link: '/strategy/allocation' },
                  { text: '4. ETF 선정 및 도구 가이드', link: '/strategy/how-to-choose' }
                ]
              },
              {
                text: '전략 실천과 기록',
                items: [
                  { text: '📜 나의 투자 여정과 기록 (History)', link: '/strategy/history' }
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
          footer: {
            message: '#18년차직장인 #KCA #자동매매투자자 #여유시간은두딸과함께 — stay the course 🌿 &nbsp;·&nbsp; <a href="/privacy">개인정보처리방침</a> &nbsp;·&nbsp; <a href="/disclaimer">면책 조항</a>',
            copyright: 'Copyright © 2026-present · 본 사이트의 모든 내용은 개인 기록이며 투자 권유가 아닙니다.'
          }
        }
      },
      en: {
        label: 'English',
        lang: 'en-US',
        title: "One Billion Dollar Donation",
        description: "Investing is just a process, the destination is contribution to the world.",
        themeConfig: {
          socialLinks: [
            {
              icon: {
                svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
              },
              link: '/en/contact'
            }
          ],
          nav: [
            { text: 'Home', link: '/en/' },
            { text: 'Philosophy', link: '/en/philosophy/intro' },
            { text: 'Strategy', link: '/en/strategy/' },
            { text: 'Books', link: '/en/books/' },
            { text: 'Stay the Course', link: '/en/stay-the-course/' }
          ],
          sidebar: {
            '/en/philosophy/': [
              {
                text: 'Investment Philosophy & Principles',
                items: [
                  { text: 'Introduction', link: '/en/philosophy/intro' },
                  { text: 'Core Principles', link: '/en/philosophy/principles' },
                  { 
                    text: 'Bogleheads 10 Philosophy', 
                    link: '/en/philosophy/bogleheads',
                    items: [
                      { text: 'Investment Planning', link: '/en/philosophy/investment-planning' }
                    ]
                  },
                  { text: 'Psychology & Mindset', link: '/en/philosophy/psychology' }
                ]
              }
            ],
            '/en/strategy/': [
              {
                text: 'Investment Strategy',
                items: [
                  { text: 'Strategy Overview', link: '/en/strategy/' },
                  { text: '1. KCA DCA Strategy', link: '/en/strategy/kca' },
                  { text: '2. Auto Investment', link: '/en/strategy/auto-investment' },
                  { text: '3. Asset Allocation', link: '/en/strategy/allocation' },
                  { text: '4. ETF Selection Guide', link: '/en/strategy/how-to-choose' }
                ]
              },
              {
                text: 'Practice & Records',
                items: [
                  { text: '📜 My Journey (History)', link: '/en/strategy/history' }
                ]
              }
            ],
            '/en/books/': [
              {
                text: 'Book Notes',
                items: [
                  { text: 'All Books', link: '/en/books/' }
                ]
              }
            ]
          },
          footer: {
            message: '#18YearsCorporate #KCA #AutoTrading #FamilyTime — stay the course 🌿 &nbsp;·&nbsp; <a href="/en/privacy">Privacy Policy</a> &nbsp;·&nbsp; <a href="/en/disclaimer">Disclaimer</a>',
            copyright: 'Copyright © 2026-present · This site is a personal record, not investment advice.'
          }
        }
      }
    }
  })
)
