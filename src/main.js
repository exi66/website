import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'viewerjs/dist/viewer.css'

import axios from 'axios'
axios.defaults.headers.post = {
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
}

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import VueViewer from 'v-viewer'
import App from './App.vue'

import RU from '@/lang/ru'
import EN from '@/lang/en'

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en: EN,
    ru: RU
  },
  globalInjection: true
})
const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(VueViewer)

app.mount('#app')
