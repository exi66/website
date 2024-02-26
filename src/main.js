import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import { createI18n } from 'vue-i18n'
import messages from './lang'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en', // set fallback locale
  messages,
  globalInjection: true
})

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(i18n).use(VueViewer).mount('#app')
