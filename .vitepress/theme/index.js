import DefaultTheme from 'vitepress/theme'
import Description from './components/Description.vue'
import './custom.css'

const { Layout } = DefaultTheme

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Description', Description)
  }
}
