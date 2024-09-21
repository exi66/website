<script setup>
const colorMode = useColorMode();
const toggleDarkTheme = () => {
  if (colorMode.preference === "light") {
    colorMode.preference = "dark";
  } else {
    colorMode.preference = "light";
  }
};

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const currentLocale = computed(() => {
  return locales.value.find((i) => i.code === locale.value);
});

const { y: windowY } = useWindowScroll();
const toTop = () => {
  window.scrollTo({ behavior: "smooth", top: 0 });
};
</script>

<template>
  <header class="border-b sticky top-0 left-0 bg-background">
    <div class="flex justify-start container max-w-screen-xl py-2">
      <a class="h-9 w-20 flex mr-4" :href="localePath('/')">
        <img
          class="h-5 w-20 mt-auto mb-2.5 bg-transparent rounded-md transition-transform hover:-rotate-6"
          src="/images/favicon.svg"
          alt="site favicon"
        />
      </a>
      <ul class="w-full hidden md:flex">
        <li>
          <Button
            as="a"
            variant="link"
            class="text-muted-foreground hover:no-underline hover:text-foreground"
            :href="localePath('/')"
            >{{ $t("menu.home") }}
          </Button>
        </li>
        <li>
          <Button
            as="a"
            variant="link"
            class="text-muted-foreground hover:no-underline hover:text-foreground"
            :href="localePath('/projects')"
            >{{ $t("menu.projects") }}
          </Button>
        </li>
        <li>
          <Button
            as="a"
            variant="link"
            class="text-muted-foreground hover:no-underline hover:text-foreground"
            :href="localePath('/blog')"
            >{{ $t("menu.blog") }}
          </Button>
        </li>
      </ul>
      <div class="ml-auto flex flex-row gap-2">
        <div>
          <ClientOnly>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon">{{
                  currentLocale.emoji
                }}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="min-w-0">
                <DropdownMenuItem
                  v-for="__locale in locales"
                  :key="__locale.code"
                  as-child
                >
                  <NuxtLink :to="switchLocalePath(__locale.code)"
                    >{{ __locale.emoji }} {{ __locale.name }}</NuxtLink
                  >
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ClientOnly>
        </div>
        <Button size="icon" variant="ghost" @click="toggleDarkTheme">
          <LucideMoon class="dark:hidden w-4 h-4" />
          <LucideSun class="dark:inline hidden w-4 h-4" />
        </Button>
        <div class="block md:hidden">
          <ClientOnly>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" size="icon">
                  <LucideMenu clas="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="min-w-0">
                <NuxtLink :href="localePath('/')">
                  <DropdownMenuItem>
                    {{ $t("menu.home") }}
                  </DropdownMenuItem>
                </NuxtLink>
                <NuxtLink :href="localePath('/projects')">
                  <DropdownMenuItem>
                    {{ $t("menu.projects") }}
                  </DropdownMenuItem>
                </NuxtLink>
                <NuxtLink :href="localePath('/blog')">
                  <DropdownMenuItem>
                    {{ $t("menu.blog") }}
                  </DropdownMenuItem>
                </NuxtLink>
              </DropdownMenuContent>
            </DropdownMenu>
          </ClientOnly>
        </div>
      </div>
    </div>
  </header>
  <main class="container max-w-screen-xl py-4">
    <slot />
  </main>
  <footer class="flex flex-col my-4 gap-1">
    <img
      class="my-auto h-5 w-auto"
      alt="favicon"
      src="/images/favicon.svg"
      title="by exi66"
    />
    <ClientOnly>
      <small class="mx-auto text-muted-foreground"
        >© {{ new Date().getFullYear() }}</small
      >
    </ClientOnly>
  </footer>
  <transition name="fade">
    <div
      v-show="windowY > 100"
      role="dialog"
      class="fixed bottom-0 right-0 z-10 p-4 flex flex-row gap-2"
    >
      <Button @click="toTop()" :title="$t('menu.scroll_to_top')">
        <LucideChevronUp />
      </Button>
    </div>
  </transition>
</template>

<style>
.fade-enter-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
