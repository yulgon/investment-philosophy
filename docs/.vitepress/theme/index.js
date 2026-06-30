import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MarketPulseDashboard from './components/MarketPulseDashboard.vue'
import EvolutionToc from './components/EvolutionToc.vue'
import EvolutionTocEn from './components/EvolutionTocEn.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('MarketPulseDashboard', MarketPulseDashboard)
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

      // 2. 우클릭 방지 (Context Menu Block)
      window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });

      // 1. 복사 시 출처 자동 삽입 (Copy Event Listener)
      window.addEventListener('copy', (e) => {
        const selection = window.getSelection();
        if (!selection || selection.toString().trim() === '') return;
        
        e.preventDefault();
        const originalText = selection.toString();
        const sourceUrl = window.location.href;
        const modifiedText = `${originalText}\n\n[출처] 원빌리언달러 도네이션\n링크: ${sourceUrl}\n※ 본 사이트의 모든 콘텐츠는 저작권법의 보호를 받으며 무단 전재, 복사, 배포를 엄격히 금지합니다.`;
        
        if (e.clipboardData) {
          e.clipboardData.setData('text/plain', modifiedText);
        }
      });
    }
  }
}
