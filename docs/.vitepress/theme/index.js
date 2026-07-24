import DefaultTheme from 'vitepress/theme'
import './custom.css'
import EvolutionToc from './components/EvolutionToc.vue'
import EvolutionTocEn from './components/EvolutionTocEn.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('EvolutionToc', EvolutionToc)
    app.component('EvolutionTocEn', EvolutionTocEn)
    
    if (typeof window !== 'undefined') {
      window.addEventListener('market-state-updated', (event) => {
        const state = event.detail
        const htmlElement = document.documentElement
        
        // Remove previous market state classes
        htmlElement.classList.forEach(cls => {
          if (cls.startsWith('market-state-')) {
            htmlElement.classList.remove(cls)
          }
        })
        
        // Add new market state class
        if (state) {
          htmlElement.classList.add(`market-state-${state.replace('_', '-')}`)
        }
      })

      // 운영 정책: 콘텐츠의 무단 복제에 최소한의 마찰을 둡니다.
      window.addEventListener('contextmenu', (event) => {
        if (event.target.closest('input, textarea, select')) return
        event.preventDefault()
      })

      // 선택이 허용된 일부 영역을 복사할 때 원문 주소를 함께 기록합니다.
      window.addEventListener('copy', (event) => {
        const selection = window.getSelection()
        if (!selection || selection.toString().trim() === '') return

        const selectedNode = selection.anchorNode?.parentElement
        if (!selectedNode?.closest('.VPContent')) return

        event.preventDefault()
        const originalText = selection.toString()
        const sourceUrl = window.location.href
        const isEnglish = document.documentElement.lang?.startsWith('en')
        const attribution = isEnglish
          ? `[Source] One Billion Dollar Donation\nLink: ${sourceUrl}\nUnauthorized reproduction and distribution are prohibited.`
          : `[출처] 원빌리언달러 도네이션\n링크: ${sourceUrl}\n무단 전재, 복사 및 배포를 금지합니다.`

        event.clipboardData?.setData('text/plain', `${originalText}\n\n${attribution}`)
      })
    }
  }
}
