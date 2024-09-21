// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {enabled: true},
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@vueuse/nuxt",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "nuxt-csurf",
    "@nuxt/image",
  ],
  csurf: {
    https: false, // default true if in production
    cookieKey: "csrf", // "__Host-csrf" if https is true otherwise just "csrf"
    cookie: {
      // CookieSerializeOptions from unjs/cookie-es
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    },
    methodsToProtect: ["POST", "PUT", "PATCH"], // the request methods we want CSRF protection for
    addCsrfTokenToEventCtx: true, // default false, to run useCsrfFetch on server set it to true
    headerName: "csrf-token", // the header where the csrf token is stored
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    preference: "system",
    fallback: "dark",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storage: "localStorage",
    storageKey: "nuxt-color-mode",
  },
  i18n: {
    defaultLocale: "ru",
    locales: [
      {
        code: "ru",
        iso: "ru-RU",
        name: "Русский",
        emoji: "🇷🇺",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        emoji: "🇬🇧",
      },
    ],
  },
  content: {
    highlight: {
      theme: {
        default: "github-light",
        "dark-mode": "github-dark",
      },
    },
    navigation: {
      fields: ['author', 'publishedAt', 'tags', 'source', 'demo', 'images', 'avatar']
    },
    markdown: {
      anchorLinks: false
    }
  },
  sourcemap: {
    client: true,
    server: true
  }
});