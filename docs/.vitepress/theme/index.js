import DefaultTheme from 'vitepress/theme'
import './custom.css'
import MarketPulseDashboard from './components/MarketPulseDashboard.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('MarketPulseDashboard', MarketPulseDashboard)
    
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
    }
  }
}
