import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(VueViewer).mount('#app')
