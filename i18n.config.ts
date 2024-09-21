import en from "./locales/en.js";
import ru from "./locales/ru.js";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ru",
  fallbackLocale: {
    "ru-RU": ["ru"],
    default: ["ru", "en"],
  },
  messages: {
    en,
    ru,
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root", // recommended
  },
}));
