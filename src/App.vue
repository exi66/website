<script setup>
import { nextTick, ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { useWindowScroll } from '@vueuse/core'
import { Laravel, Vue, MySQL, Ubuntu, Tailwind, Docker } from '@/components/icons'
import SideBar from '@/components/SideBar.vue'

const { y: windowY } = useWindowScroll()
const { changeLang, changeTheme, toggleTheme, toggleLang } = useAppStore()
const { projects, stack, experience, isDarkTheme } = storeToRefs(useAppStore())

const headerElement = ref(null)
const projectsElemets = ref({})
const form = ref({
  name: null,
  email: null,
  message: null
})
const formResponse = ref(null)
const waitResponse = ref(false)
const openSlider = ref(false)
const selected = ref(null)
const offsetY = ref(50)
const showToTop = computed(() => windowY.value > offsetY.value)
const search = ref(null)

const getLastProjects = computed(() => {
  return projects.value
    .map((e) => e)
    .reverse()
    .slice(0, 3)
})

const searchProjects = computed(() => {
  if (!search.value) return projects.value
  return projects.value.filter(
    (e) =>
      e.category.includes(search.value.toLocaleLowerCase()) ||
      e.tech.includes(search.value.toLocaleLowerCase())
  )
})

function toTop() {
  headerElement.value.scrollIntoView({ behavior: 'smooth' })
}

async function submit() {
  waitResponse.value = true
  try {
    const body = new URLSearchParams(form.value).toString()
    let res = await axios.post('./form/', body)
    if (res.status === 200 && res.data.success) {
      formResponse.value = res.data.success
    } else {
      formResponse.value = 'Error! ' + res.data.errors || res.status
    }
  } catch (e) {
    formResponse.value = 'Error! ' + e.message
  }
  waitResponse.value = false
}

async function toggleSlider(name) {
  openSlider.value = true
  await nextTick()
  let ref = projectsElemets.value[name]
  if (ref) {
    ref.scrollIntoView({ behavior: 'smooth' })
    selected.value = name
  }
}
function toggleAllSlider() {
  openSlider.value = true
  selected.value = null
}

onMounted(async () => {
  offsetY.value = headerElement.value.clientHeight
  changeTheme()
  await changeLang()
})
</script>

<template>
  <header class="container container-md mx-auto" ref="headerElement">
    <nav class="p-2 flex flex-row gap-2">
      <a href="/" class="my-auto">
        <img
          class="h-6 hover:-rotate-6 transition-all w-auto"
          alt="favicon"
          src="/images/favicon.svg"
        />
      </a>
      <button
        type="button"
        @click="toggleLang()"
        class="p-2 ml-auto uppercase select-none transition-all leading-none rounded bg-transparent border border-transparent hover:bg-black/10 dark:hover:bg-white/10"
      >
        {{ $t('lang') }}
      </button>
      <button
        type="button"
        @click="toggleTheme()"
        :title="isDarkTheme ? $t('theme.dark') : $t('theme.light')"
        :aria-label="$t('theme.switch')"
        class="p-2 transition-all leading-none rounded bg-transparent border border-transparent hover:bg-black/10 dark:hover:bg-white/10 text-yellow-500 dark:text-sky-100"
      >
        <i class="bi bi-moon-fill hidden dark:inline-block"></i>
        <i class="bi bi-brightness-high-fill inline-block dark:hidden"></i>
      </button>
    </nav>
  </header>
  <main class="mt-4 p-2 container container-md mx-auto flex flex-col gap-6">
    <section id="home" class="flex flex-row relative">
      <div class="w-auto hidden sm:flex my-auto mr-8 ml-8">
        <div class="box3d text-white">
          <div class="p1 flex bg-[#42b883]">
            <Vue class="m-auto h-16 w-auto" />
          </div>
          <div class="p2 flex bg-[#ff2d20]">
            <Laravel class="m-auto h-16 w-auto" />
          </div>
          <div class="p3 flex bg-[#00678c]">
            <MySQL class="m-auto h-16 w-auto" />
          </div>
          <div class="p4 flex bg-[#066da5]">
            <Docker class="m-auto h-16 w-auto" />
          </div>
          <div class="p5 flex bg-[#38bdf8]">
            <Tailwind class="m-auto w-16 h-auto" />
          </div>
          <div class="p6 flex bg-[#f47421]">
            <Ubuntu class="m-auto h-16 w-auto" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2 z-10">
        <h1 class="mx-auto text-3xl">
          {{ $t('hero.title') }}
          <span class="text-2xl block">
            {{ $t('hero.subtitle') }}
            <span class="text-accent">{{ $t('hero.specialization') }}</span>
          </span>
        </h1>
        <div class="flex flex-row gap-2">
          <a
            href="https://github.com/exi66"
            target="_blank"
            class="hover:text-accent transition-all rounded-full leading-0 text-3xl"
            :title="$t('hero.github')"
          >
            <i class="bi bi-github"></i>
          </a>
          <a
            href="https://t.me/exi666"
            target="_blank"
            class="hover:text-accent transition-all rounded-full leading-0 text-3xl"
            :title="$t('hero.telegram')"
          >
            <i class="bi bi-telegram"></i>
          </a>
        </div>
      </div>
    </section>
    <section id="about" class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-col gap-2 flex-1">
        <h2 class="text-xl text-black/80 dark:text-white/80">
          <i class="bi bi-person me-2"></i>{{ $t('about.title1') }}
        </h2>
        <div
          class="rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-2 flex-grow"
        >
          <p class="text-black/70 dark:text-white/70">
            {{ $t('about.summary_text1') }}
            <span class="text-accent font-semibold">{{ $t('about.summary_tech1') }}</span
            >, <span class="text-accent font-semibold">{{ $t('about.summary_tech2') }}</span>
            {{ $t('and') }}
            <span class="text-accent font-semibold">{{ $t('about.summary_tech3') }}</span>
            {{ $t('about.summary_text2') }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <h2 class="text-xl text-black/80 dark:text-white/80">
          <i class="bi bi-mortarboard me-2"></i>{{ $t('about.title2') }}
        </h2>
        <div
          class="rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-2 flex-grow"
        >
          <p class="text-black/70 dark:text-white/70">
            {{ $t('about.education_text1') }}
            <span class="text-accent font-semibold">{{ $t('about.education_degree') }}</span
            >.
            {{ $t('about.education_text2') }}
            <span class="text-accent font-semibold">{{ $t('about.education_tech1') }}</span
            >, <span class="text-accent font-semibold">{{ $t('about.education_tech2') }}</span
            >, <span class="text-accent font-semibold">{{ $t('about.education_tech3') }}</span
            >, <span class="text-accent font-semibold">{{ $t('about.education_tech4') }}</span
            >, <span class="text-accent font-semibold">{{ $t('about.education_tech5') }}</span
            >, <span class="text-accent font-semibold">{{ $t('about.education_tech6') }}</span
            >, <span class="text-accent font-semibold">{{ $t('about.education_tech7') }}</span
            >.
            {{ $t('about.education_text3') }}
          </p>
        </div>
      </div>
    </section>
    <section id="experience">
      <h2 class="text-xl text-black/80 dark:text-white/80">
        <i class="bi bi-building me-2"></i>{{ $t('experience.title') }}
      </h2>
      <ol class="relative mx-5 mt-5">
        <li class="pb-8 pl-8 border-l border-accent" v-for="e in experience" :key="e">
          <span
            class="absolute flex items-center justify-center w-8 h-8 -left-4 rounded-full bg-white ring-4 ring-accent/60"
            v-html="e.icon"
            :title="e.company"
          >
          </span>
          <h3 class="mb-1 text-lg leading-none">{{ e.job }}</h3>
          <span class="block mb-3 text-sm leading-none text-black/70 dark:text-white/70">
            <span v-if="e.company">{{ e.company + ', ' }}</span>
            <time class="inline-block">{{ e.subtitle }}</time>
          </span>
          <p class="text-black/70 dark:text-white/50">
            {{ e.desctiption }}
          </p>
        </li>
        <li class="pl-8 border-l border-transparent">
          <span
            class="absolute flex items-center justify-center w-8 h-8 -left-4 rounded-full bg-white ring-4 ring-accent/60"
          >
            <span class="text-black font-bold">?</span>
          </span>
          <h3 class="mb-1 text-lg leading-none">...</h3>
          <span class="block mb-3 text-sm leading-none text-black/70 dark:text-white/50">
            {{ $t('experience.last') }}
          </span>
        </li>
      </ol>
    </section>
    <section id="stack" class="flex flex-col gap-2">
      <h2 class="text-xl text-black/80 dark:text-white/80">
        <i class="bi bi-code-slash me-2"></i>{{ $t('stack.title') }}
      </h2>
      <div
        class="rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-2"
      >
        <div class="hidden lg:flex flex-row">
          <div class="flex flex-col gap-2">
            <div class="my-auto flex" v-for="t in stack" :key="t">
              <span class="opacity-80">{{ t.label }}</span>
              <div
                class="mx-2 flex-grow border-t min-w-4 my-auto dark:border-white/70 border-black/70"
              ></div>
            </div>
          </div>
          <div class="flex flex-col gap-2 flex-grow">
            <div class="flex flex-row gap-2" v-for="(t, index) in stack" :key="t">
              <div
                class="text-center rounded p-2 flex-1 align-middle bg-accent bg-opacity-[--opacity]"
                v-for="f in t.techs"
                :key="f"
                :style="'--opacity: ' + Math.min((index + 1) * 10, 100) + '%'"
              >
                {{ f }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow lg:hidden gap-2">
          <fieldset
            class="flex flex-row gap-2 p-2 border rounded-md dark:border-white/70 border-black/70"
            v-for="(t, index) in stack"
            :key="t"
          >
            <div
              class="text-center rounded p-2 flex-1 flex bg-accent bg-opacity-[--opacity]"
              v-for="f in t.techs"
              :key="f"
              :style="'--opacity: ' + Math.min((index + 1) * 10, 100) + '%'"
            >
              <span class="my-auto mx-auto">{{ f }}</span>
            </div>
            <legend class="mx-auto px-2 opacity-90">{{ t.label }}</legend>
          </fieldset>
        </div>
      </div>
    </section>
    <section id="projects" class="flex flex-col gap-2">
      <h2 class="text-xl text-black/80 dark:text-white/80">
        <i class="bi bi-terminal me-2"></i>{{ $t('projects.title') }}
      </h2>
      <div
        class="rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col"
      >
        <div
          v-for="p in getLastProjects"
          :key="p"
          @click="toggleSlider(p.name)"
          class="flex flex-row gap-2 border-b p-2 cursor-pointer border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
        >
          <img :src="p.thumbnail" class="w-16 h-16 rounded object-cover" />
          <div class="flex flex-col flex-wrap my-auto truncate">
            <h3>{{ p.name }}</h3>
            <p class="text-black/70 dark:text-white/70 truncate">
              {{ p.description }}
            </p>
          </div>
        </div>
        <button
          type="button"
          @click="toggleAllSlider"
          class="m-2 p-2 text-center text-sm font-semibold leading-4 border border-accent text-accent rounded uppercase transition-all dark:hover:text-shark-900 hover:text-white hover:bg-accent disabled:opacity-50 disabled:cursor-wait"
        >
          {{ $t('projects.show_all') }}
        </button>
      </div>
    </section>
    <section id="contacts" class="flex flex-col gap-2">
      <h2 class="text-xl text-black/80 dark:text-white/80">
        <i class="bi bi-envelope me-2"></i>{{ $t('contacts.title') }}
      </h2>
      <div
        class="rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-2"
      >
        <div class="flex flex-col text-black/80 dark:text-white/80">
          <div class="flex flex-1 flex-row flex-wrap justify-center gap-4 mb-3">
            <div class="flex flex-row">
              <i class="my-auto me-3 text-3xl bi bi-github"></i>
              <div class="flex flex-col my-auto">
                <span>GitHub</span>
                <a
                  href="https://github.com/exi66"
                  target="_blank"
                  class="text-accent hover:underline transition-all"
                  >@exi66</a
                >
              </div>
            </div>
            <div class="flex flex-row">
              <i class="my-auto me-3 text-3xl bi bi-telegram"></i>
              <div class="flex flex-col my-auto">
                <span>Telegram</span>
                <a
                  href="https://t.me/exi666"
                  target="_blank"
                  class="text-accent hover:underline transition-all"
                  >@exi666</a
                >
              </div>
            </div>
            <div class="flex flex-row">
              <i class="my-auto me-3 text-3xl bi bi-envelope-at-fill"></i>
              <div class="flex flex-col my-auto">
                <span>Email</span>
                <a
                  href="mailto:me@exi.moe"
                  target="_blank"
                  class="text-accent hover:underline transition-all"
                  >me@exi.moe</a
                >
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-2 my-2">
            <div class="border-t border-black/10 dark:border-white/10 flex-1 my-auto"></div>
            <span class="uppercase text-xl">{{ $t('or') }}</span>
            <div class="border-t border-black/10 dark:border-white/10 flex-1 my-auto"></div>
          </div>
          <div class="flex-1">
            <transition name="fade">
              <div
                v-if="formResponse"
                class="rounded p-3 flex items-center border border-green-300 text-green-800 bg-green-50 dark:bg-shark-950 dark:text-green-400 dark:border-green-800 aria-[errormessage='true']:text-red-800 aria-[errormessage='true']:border-red-300 dark:aria-[errormessage='true']:border-red-800 aria-[errormessage='true']:bg-red-50 dark:aria-[errormessage='true']:text-red-400"
                :aria-errormessage="formResponse.includes('Error')"
              >
                <p>{{ formResponse }}</p>
                <button
                  type="button"
                  class="ms-auto -mx-1.5 -my-1.5 hover:opacity-50 transition-all"
                  @click="formResponse = null"
                >
                  <i class="mx-2 bi bi-x-lg"></i>
                </button>
              </div>
            </transition>
            <form class="flex flex-row flex-wrap gap-2" @submit.prevent="submit">
              <div class="flex-1 mt-2">
                <label class="text-sm dark:text-white/80 text-black/80"
                  >{{ $t('contacts.name') }}
                  <span class="text-red-500" :title="$t('contacts.required')">*</span>
                  <input
                    type="text"
                    name="name"
                    class="mt-1 rounded-md w-full p-2 text-black dark:text-white dark:bg-shark-950 outline-none focus:ring-1 ring-accent/60 transition-all"
                    :placeholder="$t('contacts.name_placeholder')"
                    required
                    v-model="form.name"
                  />
                </label>
              </div>
              <div class="flex-1 mt-2">
                <label class="text-sm dark:text-white/80 text-black/80"
                  >{{ $t('contacts.email') }}
                  <span class="text-red-500" :title="$t('contacts.required')">*</span>
                  <input
                    type="email"
                    name="email"
                    class="mt-1 rounded-md w-full p-2 text-black dark:text-white dark:bg-shark-950 outline-none focus:ring-1 ring-accent/60 transition-all"
                    :placeholder="$t('contacts.email_placeholder')"
                    required
                    v-model="form.email"
                  />
                </label>
              </div>
              <div class="w-full">
                <label class="text-sm dark:text-white/80 text-black/80"
                  >{{ $t('contacts.message') }}
                  <span class="text-red-500" :title="$t('contacts.required')">*</span>
                  <textarea
                    name="text"
                    class="mt-1 rounded-md w-full p-2 text-black dark:text-white dark:bg-shark-950 outline-none focus:ring-1 ring-accent/60 transition-all"
                    :placeholder="$t('contacts.message_placeholder')"
                    rows="4"
                    required
                    autocomplete="off"
                    v-model="form.message"
                  ></textarea>
                </label>
              </div>
              <div class="flex w-full">
                <button
                  type="submit"
                  :disabled="waitResponse"
                  class="p-2 flex-grow text-center text-sm font-semibold leading-4 border border-accent text-accent rounded uppercase transition-all dark:hover:text-shark-900 hover:text-white hover:bg-accent disabled:opacity-50 disabled:cursor-wait"
                >
                  {{ $t('contacts.submit') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer class="flex flex-col pt-2 pb-4 gap-1">
    <img class="my-auto h-5 w-auto" alt="favicon" src="/images/favicon.svg" title="by exi66" />
    <small class="mx-auto dark:text-white/70 text-black/70"
      >© {{ new Date().getFullYear() }}</small
    >
  </footer>
  <transition name="fade">
    <div
      v-show="showToTop"
      role="dialog"
      class="fixed bottom-0 right-0 z-10 p-4 flex flex-row gap-2"
    >
      <button
        type="button"
        @click="toggleLang()"
        class="uppercase select-none py-2 px-4 transition-all leading-none rounded bg-transparent border bg-white dark:bg-shark-950 border-black/10 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-shark-900"
      >
        {{ $t('lang') }}
      </button>
      <button
        type="button"
        @click="toggleTheme()"
        :title="isDarkTheme ? $t('theme.dark') : $t('theme.light')"
        :aria-label="$t('theme.switch')"
        class="py-2 px-4 transition-all leading-none rounded bg-transparent border bg-white dark:bg-shark-950 border-black/10 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-shark-900 text-yellow-500 dark:text-sky-100"
      >
        <i class="bi bi-moon-fill hidden dark:inline-block"></i>
        <i class="bi bi-brightness-high-fill inline-block dark:hidden"></i>
      </button>
      <button
        type="button"
        :title="$t('to_top')"
        @click="toTop()"
        class="py-2 px-4 transition-all leading-none rounded bg-transparent border bg-white dark:bg-shark-950 border-black/10 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-shark-900"
      >
        <i class="bi bi-chevron-up"></i>
      </button>
    </div>
  </transition>
  <SideBar v-model="openSlider">
    <div
      class="border-b border-black/10 dark:border-white/10 p-5 flex flex-row flex-wrap justify-between gap-4"
    >
      <span class="text-2xl font-semibold">
        {{ $t('projects.title') }}
      </span>
      <div class="relative my-auto">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <i class="bi bi-search"></i>
        </div>
        <input
          type="search"
          id="search-projects"
          v-model="search"
          class="block w-full px-2 py-1 ps-10 rounded text-sm border border-black/10 dark:border-white/10 text-black dark:text-white dark:bg-shark-900 outline-none focus:border-accent/60 dark:focus:border-accent/60 transition-all"
          :placeholder="$t('projects.search_placeholder')"
        />
      </div>
    </div>
    <div class="flex flex-col mb-5">
      <div v-show="searchProjects.length < 1" class="p-3 dark:text-white/70 text-black/70">
        {{ $t('projects.search_not_found', { query: search }) }}
      </div>
      <div
        v-for="p in searchProjects"
        :key="p.name"
        :ref="(el) => (projectsElemets[p.name] = el)"
        :aria-selected="p.name == selected"
        class="border-b border-black/10 dark:border-white/10 p-3 aria-selected:bg-accent/10"
      >
        <a
          v-if="p.url"
          :href="p.url"
          class="text-2xl mb-1 inline-block hover:underline transition-all text-accent"
          target="_blank"
        >
          {{ p.name }}
        </a>
        <span v-else class="text-2xl mb-1 inline-block">
          {{ p.name }}
        </span>
        <viewer
          :images="p.images"
          :options="{ toolbar: false, title: false }"
          class="flex flex-wrap gap-2"
        >
          <img
            v-for="src in p.images"
            :key="src"
            :src="src"
            class="h-16 w-16 object-cover rounded bg-black cursor-zoom-in hover:scale-110 transition duration-150"
          />
        </viewer>
        <span class="mb-1 mt-3 block uppercase font-semibold"
          >{{ $t('projects.categories') }}:</span
        >
        <div class="flex flex-row flex-wrap gap-2">
          <span
            v-for="c in p.category"
            :key="c"
            class="bg-accent text-white/80 rounded px-1 text-sm cursor-pointer hover:opacity-80 transition-all"
            @click="search = c"
          >
            {{ c }}
          </span>
        </div>
        <span class="mb-1 mt-3 block uppercase font-semibold">{{ $t('projects.stack') }}:</span>
        <div class="flex flex-row flex-wrap gap-2">
          <span
            v-for="c in p.tech"
            :key="c"
            class="bg-accent text-white/80 rounded px-1 text-sm cursor-pointer hover:opacity-80 transition-all"
            @click="search = c"
          >
            {{ c }}
          </span>
        </div>
        <span class="mb-1 mt-3 block uppercase font-semibold">{{ $t('projects.details') }}:</span>
        <p class="text-black/70 dark:text-white/70">{{ p.description }}. {{ p.details }}</p>
      </div>
    </div>
  </SideBar>
</template>

<style scoped>
.box3d {
  width: 6rem;
  height: 6rem;
  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
}

.box3d div {
  position: absolute;
  left: 0;
  top: 0;
  width: 5rem;
  height: 5rem;
  opacity: 0.8;
  transform-origin: 50% 50% -2.5rem;
}

.p1 {
  transform: perspective(600px) rotateX(0deg) rotateY(90deg) rotateZ(0deg);
  animation: spin1 10s infinite linear;
}

.p2 {
  animation: spin2 10s infinite linear;
}

.p3 {
  animation: spin3 10s infinite linear;
}

.p4 {
  animation: spin4 10s infinite linear;
}

.p5 {
  animation: spin5 10s infinite linear;
}

.p6 {
  animation: spin6 10s infinite linear;
}

@keyframes spin1 {
  to {
    transform: perspective(600px) rotateX(360deg) rotateY(450deg) rotateZ(0deg);
  }
}

@keyframes spin2 {
  0% {
    transform: perspective(600px) rotateX(0deg) rotateY(270deg) rotateZ(0deg);
  }

  100% {
    transform: perspective(600px) rotateX(360deg) rotateY(630deg) rotateZ(0deg);
  }
}

@keyframes spin3 {
  0% {
    transform: perspective(600px) rotateX(90deg) rotateY(0deg) rotateZ(0deg);
  }

  100% {
    transform: perspective(600px) rotateX(450deg) rotateY(0deg) rotateZ(-360deg);
  }
}

@keyframes spin4 {
  0% {
    transform: perspective(600px) rotateX(-90deg) rotateY(0deg) rotateZ(0deg);
  }

  100% {
    transform: perspective(600px) rotateX(270deg) rotateY(0deg) rotateZ(360deg);
  }
}

@keyframes spin5 {
  0% {
    transform: perspective(600px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }

  100% {
    transform: perspective(600px) rotateX(360deg) rotateY(360deg) rotateZ(0deg);
  }
}

@keyframes spin6 {
  0% {
    transform: perspective(600px) rotateX(0deg) rotateY(180deg) rotateZ(0deg);
  }

  100% {
    transform: perspective(600px) rotateX(360deg) rotateY(540deg) rotateZ(0deg);
  }
}
</style>
