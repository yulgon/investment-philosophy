import { defineConfig } from 'vitepress'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = 'https://one-billion-donation.com'

const outputPath = (relativePath) => {
  if (relativePath.endsWith('index.md')) {
    return `/${relativePath.replace(/index\.md$/, '')}`
  }
  return `/${relativePath.replace(/\.md$/, '.html')}`
}

const absoluteUrl = (relativePath) => `${SITE_URL}${outputPath(relativePath)}`

export default defineConfig({
    base: '/',
    sitemap: {
      hostname: SITE_URL
    },
    head: [
      ['meta', { name: 'robots', content: 'index, follow' }],
      ['meta', { name: 'theme-color', content: '#0f766e' }],
      ['meta', { name: 'naver-site-verification', content: 'e52fe99e70ff96372bd79bd9be9697ece2d96795' }],
      // AdSense 소유권 확인용 메타 태그입니다. 광고·분석 스크립트는
      // 개인정보 고지와 동의 관리가 준비된 뒤 별도로 활성화합니다.
      ['meta', { name: 'google-adsense-account', content: 'ca-pub-6597757677689519' }]
    ],
    markdown: {
      config(md) {
        const defaultImageRenderer = md.renderer.rules.image
          || ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
          tokens[idx].attrSet('loading', 'lazy')
          tokens[idx].attrSet('decoding', 'async')
          return defaultImageRenderer(tokens, idx, options, env, self)
        }
      }
    },
    themeConfig: {
      logo: '/logo.png',
      search: {
        provider: 'local'
      }
    },
    transformHead: ({ pageData }) => {
      const head = [];

      // 기본 제목 및 설명 설정 (페이지 고유 값이 없으면 전역 기본값 사용)
      const title = pageData.frontmatter.title || pageData.title || '원빌리언달러 도네이션';
      const description = pageData.frontmatter.description || pageData.description || '투자는 과정일 뿐, 목적지는 세상에 대한 기여입니다. 원빌리언달러 기부를 향한 자산 설계 아카이브.';

      const relativePath = pageData.relativePath;
      const url = absoluteUrl(relativePath);
      const isEnglish = relativePath.startsWith('en/');
      const alternateRelativePath = isEnglish
        ? relativePath.slice(3)
        : `en/${relativePath}`;
      const alternateExists = existsSync(resolve(process.cwd(), 'docs', alternateRelativePath));

      // 공유 이미지 (프론트매터에 지정된 이미지가 없으면 로고 사용)
      const image = pageData.frontmatter.image?.src || pageData.frontmatter.image || '/logo.png';
      const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : '/' + image}`;

      head.push(['link', { rel: 'canonical', href: url }]);
      head.push(['link', { rel: 'alternate', hreflang: isEnglish ? 'en-US' : 'ko-KR', href: url }]);
      if (alternateExists) {
        head.push(['link', {
          rel: 'alternate',
          hreflang: isEnglish ? 'ko-KR' : 'en-US',
          href: absoluteUrl(alternateRelativePath)
        }]);
      }
      const koreanHome = `${SITE_URL}/`;
      head.push(['link', { rel: 'alternate', hreflang: 'x-default', href: koreanHome }]);

      // Open Graph 태그 주입
      head.push(['meta', { property: 'og:locale', content: isEnglish ? 'en_US' : 'ko_KR' }]);
      head.push(['meta', { property: 'og:type', content: pageData.frontmatter.layout === 'home' ? 'website' : 'article' }]);
      head.push(['meta', { property: 'og:title', content: title }]);
      head.push(['meta', { property: 'og:description', content: description }]);
      head.push(['meta', { property: 'og:url', content: url }]);
      head.push(['meta', { property: 'og:image', content: imageUrl }]);

      // Twitter 카드 태그 주입
      head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }]);
      head.push(['meta', { name: 'twitter:title', content: title }]);
      head.push(['meta', { name: 'twitter:description', content: description }]);
      head.push(['meta', { name: 'twitter:image', content: imageUrl }]);

      const structuredData = {
        '@context': 'https://schema.org',
        '@type': pageData.frontmatter.layout === 'home' ? 'WebSite' : 'BlogPosting',
        name: title,
        headline: title,
        description,
        url,
        inLanguage: isEnglish ? 'en-US' : 'ko-KR',
        image: imageUrl,
        author: {
          '@type': 'Person',
          name: isEnglish ? 'One Billion Dollar Donation site operator' : '원빌리언달러 도네이션 운영자',
          url: `${SITE_URL}${isEnglish ? '/en/methodology.html' : '/methodology.html'}`
        },
        publisher: {
          '@type': 'Organization',
          name: isEnglish ? 'One Billion Dollar Donation' : '원빌리언달러 도네이션',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/logo.png`
          }
        },
        ...(pageData.frontmatter.date ? { datePublished: pageData.frontmatter.date } : {}),
        ...(pageData.frontmatter.reviewed ? { dateModified: pageData.frontmatter.reviewed } : {})
      };
      head.push(['script', { type: 'application/ld+json' }, JSON.stringify(structuredData).replace(/</g, '\\u003c')]);

      return head;
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
            { text: 'Stay the Course', link: '/stay-the-course/' },
            { text: '운영자·편집 원칙', link: '/about' }
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
                  { text: '투자 심리와 마인드셋', link: '/philosophy/psychology' },
                  { text: '투자 이론 지도', link: '/wiki/' }
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
                  { text: '📜 나의 투자 여정과 기록 (History)', link: '/strategy/history' },
                  { text: '🔥 Rule of 60 바벨 전략 (2Q26)', link: '/strategy/rule-of-60-barbell' }
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
            ],
            '/wiki/': [
              {
                text: '투자 이론 지도',
                items: [
                  { text: '이론 비교와 읽는 순서', link: '/wiki/' },
                  { text: '현대 포트폴리오 이론', link: '/wiki/mpt' },
                  { text: 'CAPM', link: '/wiki/capm' },
                  { text: '효율적 시장 가설', link: '/wiki/emh' },
                  { text: '블랙스완과 바벨', link: '/wiki/black-swan' }
                ]
              }
            ]
          },
          footer: {
            message: '#18년차직장인 #KCA #자동매매투자자 #여유시간은두딸과함께 — stay the course 🌿 &nbsp;·&nbsp; <a href="/about">운영자·편집 원칙</a> &nbsp;·&nbsp; <a href="/methodology">출처·산정 방식</a> &nbsp;·&nbsp; <a href="/privacy">개인정보</a> &nbsp;·&nbsp; <a href="/disclaimer">면책</a> &nbsp;·&nbsp; <a href="/copyright">저작권</a>',
            copyright: 'Copyright © 2026-present · 개인 투자 기록이며 투자 권유가 아닙니다.'
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
            { text: 'Stay the Course', link: '/en/stay-the-course/' },
            { text: 'Author & Editorial Policy', link: '/en/about' }
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
                  { text: 'Psychology & Mindset', link: '/en/philosophy/psychology' },
                  { text: 'Investment Theory Map', link: '/en/wiki/' }
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
                  { text: '📜 My Journey (History)', link: '/en/strategy/history' },
                  { text: '🔥 Rule of 60 Screen (2Q26)', link: '/en/strategy/rule-of-60-barbell' }
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
            ],
            '/en/wiki/': [
              {
                text: 'Investment Theory Map',
                items: [
                  { text: 'Compare the Frameworks', link: '/en/wiki/' },
                  { text: 'Modern Portfolio Theory', link: '/en/wiki/mpt' },
                  { text: 'CAPM', link: '/en/wiki/capm' },
                  { text: 'Efficient Market Hypothesis', link: '/en/wiki/emh' },
                  { text: 'Black Swans & Barbell', link: '/en/wiki/black-swan' }
                ]
              }
            ]
          },
          footer: {
            message: '#18YearsCorporate #KCA #AutoTrading #FamilyTime — stay the course 🌿 &nbsp;·&nbsp; <a href="/en/about">Author & Editorial Policy</a> &nbsp;·&nbsp; <a href="/en/methodology">Sources</a> &nbsp;·&nbsp; <a href="/en/privacy">Privacy</a> &nbsp;·&nbsp; <a href="/en/disclaimer">Disclaimer</a> &nbsp;·&nbsp; <a href="/en/copyright">Copyright</a>',
            copyright: 'Copyright © 2026-present · A personal investment record, not investment advice.'
          }
        }
      }
    }
  })
