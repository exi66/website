import {defineNuxtPlugin} from '#app'
import VueViewer from 'v-viewer'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(VueViewer)
})