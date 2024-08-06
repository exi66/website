import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

export const useAppStore = defineStore('app', () => {
  const { t, locale } = useI18n()
  const theme = ref(localStorage.getItem('theme') || 'dark')
  const isDarkTheme = computed(() => theme.value === 'dark')
  const lang = ref(
    localStorage.getItem('lang')
      ? localStorage.getItem('lang')
      : navigator?.language === 'ru' || navigator?.language === 'ru-RU'
        ? 'ru'
        : 'en'
  )

  function changeTheme() {
    if (theme.value == 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }
  function toggleTheme() {
    if (theme.value == 'dark') {
      theme.value = 'light'
      localStorage.setItem('theme', 'light')
    } else {
      theme.value = 'dark'
      localStorage.setItem('theme', 'dark')
    }
    changeTheme()
  }
  function toggleLang() {
    if (lang.value == 'en') {
      lang.value = 'ru'
      localStorage.setItem('lang', 'ru')
    } else {
      lang.value = 'en'
      localStorage.setItem('lang', 'en')
    }
    changeLang()
  }
  async function changeLang() {
    locale.value = lang.value
    document.documentElement.setAttribute('lang', lang.value)
    document.title = t('title')

    await fetchExperience()
    await fetchStack()
    await fetchProjects()
  }

  const __experience = reactive({
    ru: null,
    en: null
  })

  async function fetchExperience() {
    if (!__experience[lang.value]) {
      const res = await axios.get(`/data/${lang.value}/experience.json`)
      __experience[lang.value] = res.data
    }
  }

  const __stack = reactive({
    ru: null,
    en: null
  })

  async function fetchStack() {
    if (!__stack[lang.value]) {
      const res = await axios.get(`/data/${lang.value}/stack.json`)
      __stack[lang.value] = res.data
    }
  }

  const __projects = reactive({
    ru: null,
    en: null
  })

  async function fetchProjects() {
    if (!__projects[lang.value]) {
      const res = await axios.get(`/data/${lang.value}/projects.json`)
      __projects[lang.value] = res.data
    }
  }

  const projects = computed(() => __projects[lang.value] || [])
  const experience = computed(() => __experience[lang.value] || [])
  const stack = computed(() => __stack[lang.value] || [])

  return {
    theme,
    lang,
    isDarkTheme,
    toggleLang,
    toggleTheme,
    changeLang,
    changeTheme,
    experience,
    stack,
    projects
  }
})
