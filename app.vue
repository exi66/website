<script setup>
import {polyfillCountryFlagEmojis} from "country-flag-emoji-polyfill";

polyfillCountryFlagEmojis();

const {t} = useI18n();

const i18nHead = useLocaleHead({
  addSeoAttributes: {
    canonicalQueries: [],
  }
});
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || []), {name: "description", content: t("meta.description")}],
});
defineI18nRoute({
  locales: ["ru", "en"],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
