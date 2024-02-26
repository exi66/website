<script setup>
import axios from 'axios';
import { nextTick } from 'vue';
</script>

<script>
import IconExiLine from '@/components/icons/IconExiLine.vue';
// import IconOrbit from '@/components/icons/IconOrbit.vue';
import IconLaravel from '@/components/icons/IconLaravel.vue';
import IconVue from '@/components/icons/IconVue.vue';
import IconMySQL from '@/components/icons/IconMySQL.vue';
import IconDocker from '@/components/icons/IconDocker.vue';
import IconUbuntu from '@/components/icons/IconUbuntu.vue';
import IconTailwind from '@/components/icons/IconTailwind.vue';
import SideBar from '@/components/SideBar.vue';

axios.defaults.headers.post = {
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
}

export default {
  components: {
    IconExiLine,
    SideBar,
    IconVue,
    IconLaravel,
    IconMySQL,
    IconDocker,
    IconUbuntu,
    IconTailwind
  },
  data() {
    return {
      lang: 'en',
      theme: 'dark',
      experience: [],
      stack: [],
      projects: [],
      form: {
        name: null,
        email: null,
        message: null,
      },
      formResponse: null,
      waitResponse: false,
      openSlider: false,
      selected: null,
      showToTop: false,
      search: null,
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  async mounted() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.changeTheme();

    let n = navigator?.language == 'ru' ? 'ru' : 'en';
    this.lang = localStorage.getItem('lang') || n || 'en';
    await this.changeLang();
  },
  computed: {
    getLastProjects() {
      return this.projects.map(e => e).reverse().slice(0, 3);
    },
    searchProjects() {
      if (!this.search) return this.projects;
      return this.projects.filter(e => {
        let tags = e.category.join('|').toLocaleLowerCase();
        let tech = e.tech.join('|').toLocaleLowerCase();
        return tags.includes(this.search + ''.toLocaleLowerCase()) || tech.includes(this.search + ''.toLocaleLowerCase())
      });
    }
  },
  methods: {
    toTop() {
      this.$refs.header.scrollIntoView({ behavior: 'smooth' });
    },
    handleScroll() {
      this.showToTop = window.scrollY >= this.$refs.header.clientHeight;
    },
    async submit() {
      this.waitResponse = true;
      try {
        const body = new URLSearchParams(this.form).toString();
        let res = await axios.post('./form/', body);
        if (res.status === 200 && res.data.success) {
          this.formResponse = res.data.success;
        } else {
          this.formResponse = 'Error! ' + res.data.errors || res.status;
        }
      } catch (e) {
        this.formResponse = 'Error! ' + e.message;
      }
      this.waitResponse = false;
    },
    async toggleSlider(name) {
      this.openSlider = true;
      await nextTick();
      let ref = this.$refs['project_' + name][0] || null;
      if (ref) {
        ref.scrollIntoView({ behavior: 'smooth' })
        this.selected = name;
      };
    },
    changeTheme() {
      if (this.theme == 'light') {
        document.documentElement.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
      }
    },
    toggleTheme() {
      if (this.theme == 'dark') {
        this.theme = 'light';
        localStorage.setItem('theme', 'light')
      } else {
        this.theme = 'dark';
        localStorage.setItem('theme', 'dark')
      }
      this.changeTheme();
    },
    toggleLang() {
      if (this.lang == 'en') {
        this.lang = 'ru';
        localStorage.setItem('lang', 'ru')
      } else {
        this.lang = 'en';
        localStorage.setItem('lang', 'en')
      }
      this.changeLang();
    },
    async changeLang() {
      this.$i18n.locale = this.lang;
      document.getElementsByTagName('html')[0].setAttribute('lang', this.lang);
      document.title = this.$t('title')

      await this.getExperience();
      await this.getStack();
      await this.getProjects();
    },
    async getExperience() {
      if (this.lang === 'en') {
        let res = await axios.get('/experience.json');
        this.experience = res.data;
      } else {
        try {
          let res = await axios.get(`/experience.${this.lang}.json`);
          this.experience = res.data;
        } catch (e) {
          let res = await axios.get('/experience.json');
          this.experience = res.data;
        }
      }
    },
    async getStack() {
      if (this.lang === 'en') {
        let res = await axios.get('/stack.json');
        this.stack = res.data;
      } else {
        try {
          let res = await axios.get(`/stack.${this.lang}.json`);
          this.stack = res.data;
        } catch (e) {
          let res = await axios.get('/stack.json');
          this.stack = res.data;
        }
      }
    },
    async getProjects() {
      if (this.lang === 'en') {
        let res = await axios.get('/projects.json');
        this.projects = res.data;
      } else {
        try {
          let res = await axios.get(`/projects.${this.lang}.json`);
          this.projects = res.data;
        } catch (e) {
          let res = await axios.get('/projects.json');
          this.projects = res.data;
        }
      }
    }
  }
}
</script>

<template>
  <header class="container container-md mx-auto" ref="header">
    <nav class="p-2 flex flex-row gap-2">
      <a href="/" class="my-auto py-2">
        <IconExiLine class="h-4 text-mojo-600 hover:-rotate-6 transition-all" />
      </a>
      <button type="button" @click="toggleLang()"
        class="p-2 ml-auto uppercase select-none transition-all leading-none rounded bg-transparent border border-transparent hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10">
        {{ $t('lang') }}
      </button>
      <button type="button" @click="toggleTheme()" :title="theme == 'light' ? $t('theme.dark') : $t('theme.light')"
        :aria-label="$t('theme.switch')"
        class="p-2 transition-all leading-none rounded bg-transparent border border-transparent hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 text-yellow-500 dark:text-sky-100">
        <i class="bi bi-moon-fill hidden dark:inline-block"></i>
        <i class="bi bi-brightness-high-fill inline-block dark:hidden"></i>
      </button>
    </nav>
  </header>
  <main class="mt-4 p-2 container container-md mx-auto flex flex-col gap-6">
    <section id="home" class="flex flex-row">
      <div class="w-auto hidden sm:flex my-auto mr-8 ml-8">
        <div class="box3d text-white">
          <div class="p1 flex bg-[#42b883]">
            <IconVue class="m-auto h-16 w-auto" />
          </div>
          <div class="p2 flex bg-[#ff2d20]">
            <IconLaravel class="m-auto h-16 w-auto" />
          </div>
          <div class="p3 flex bg-[#00678c]">
            <IconMySQL class="m-auto h-16 w-auto" />
          </div>
          <div class="p4 flex bg-[#066da5]">
            <IconDocker class="m-auto h-16 w-auto" />
          </div>
          <div class="p5 flex bg-[#38bdf8]">
            <IconTailwind class="m-auto w-16 h-auto" />
          </div>
          <div class="p6 flex bg-[#f47421]">
            <IconUbuntu class="m-auto h-16 w-auto" />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="mx-auto text-3xl">
          {{ $t('hero.title') }}
          <span class="text-2xl block">
            {{ $t('hero.subtitle') }}
            <span class="text-mojo-600">{{ $t('hero.specialization') }}</span>
          </span>
        </h1>
        <div class="flex flex-row gap-2">
          <a href="https://github.com/exi66" target="_blank" class="text-3xl hover:text-mojo-600 transition-all"
            :title="$t('hero.github')">
            <i class="bi bi-github"></i>
          </a>
          <a href="https://t.me/exi666" target="_blank" class="text-3xl hover:text-mojo-600 transition-all"
            :title="$t('hero.telegram')">
            <i class="bi bi-telegram"></i>
          </a>
        </div>
      </div>
      <!-- <IconOrbit class="ml-auto h-24 w-auto hidden sm:block" /> -->
    </section>
    <section id="about" class="flex flex-col md:flex-row gap-4">
      <div class="flex flex-col gap-2 flex-1">
        <h2 class="uppercase opacity-80">
          <i class="bi bi-person me-1"></i>{{ $t('about.title1') }}
        </h2>
        <div
          class="rounded bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 border border-black dark:border-white border-opacity-10 dark:border-opacity-10 p-2 flex-grow">
          <p class="opacity-70">
            {{ $t('about.summary_text1') }}
            <span class="text-mojo-600 font-semibold">{{ $t('about.summary_tech1') }}</span>,
            <span class="text-mojo-600 font-semibold">{{ $t('about.summary_tech2') }}</span> {{ $t('and') }}
            <span class="text-mojo-600 font-semibold">{{ $t('about.summary_tech3') }}</span>
            {{ $t('about.summary_text2') }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <h2 class="uppercase opacity-80">
          <i class="bi bi-book me-1"></i>{{ $t('about.title2') }}
        </h2>
        <div
          class="rounded bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 border border-black dark:border-white border-opacity-10 dark:border-opacity-10 p-2 flex-grow">
          <p class="opacity-70">
            {{ $t('about.education_text1') }}
            <span class="text-mojo-600 font-semibold">{{ $t('about.education_degree') }}</span>.
            {{ $t('about.education_text2') }}
            <span class="text-mojo-600 font-semibold">{{ $t('about.education_tech1') }}</span>,
            <span class="text-mojo-600 font-semibold">{{ $t('about.education_tech2') }}</span>,
            <span class="text-mojo-600 font-semibold">{{ $t('about.education_tech3') }}</span>,
            <span class="text-mojo-600 font-semibold">{{ $t('about.education_tech4') }}</span>,
            <span class="text-mojo-600 font-semibold">{{ $t('about.education_tech5') }}</span>,
            <span class="text-mojo-600 font-semibold">{{ $t('about.education_tech6') }}</span>,
            <span class="text-mojo-600 font-semibold">{{ $t('about.education_tech7') }}</span>.
            {{ $t('about.education_text3') }}
          </p>
        </div>
      </div>
    </section>
    <section id="experience">
      <h2 class="uppercase opacity-80">
        <i class="bi bi-building me-1"></i>{{ $t('experience.title') }}
      </h2>
      <ol class="relative mx-5 mt-3">
        <li class="pb-8 pl-8 border-l border-mojo-600" v-for="e in experience" :key="e">
          <span
            class="absolute flex items-center justify-center w-8 h-8 -left-4 rounded-full bg-white ring-4 ring-opacity-60 ring-mojo-600"
            v-html="e.icon" :title="e.company">
          </span>
          <h3 class="mb-1 text-lg uppercase leading-none">{{ e.job }}</h3>
          <span class="block mb-3 leading-none opacity-70 text-sm font-normal">
            <span v-if="e.company" title="Company name">{{ e.company + ', ' }}</span>
            <time class="inline-block">{{ e.subtitle }}</time>
          </span>
          <p class="text-base font-normal opacity-70">
            {{ e.desctiption }}
          </p>
        </li>
        <li class="pl-8 border-l border-transparent">
          <span
            class="absolute flex items-center justify-center w-8 h-8 -left-4 rounded-full bg-white ring-4 ring-opacity-60 ring-mojo-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-question text-black"
              viewBox="0 0 16 16">
              <path
                d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>
          </span>
          <h3 class="mb-1 text-lg uppercase leading-none">...</h3>
          <span class="block mb-3 leading-none opacity-70 text-sm font-normal">
            <span>{{ $t('experience.last') }}</span>
          </span>
        </li>
      </ol>
    </section>
    <section id="stack" class="flex flex-col gap-2">
      <h2 class="uppercase opacity-80">
        <i class="bi bi-code-slash me-1"></i>{{ $t('stack.title') }}
      </h2>
      <div
        class="rounded bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 border border-black dark:border-white border-opacity-10 dark:border-opacity-10 p-2">
        <div class="hidden lg:flex flex-row">
          <div class="flex flex-col gap-2">
            <div class="my-auto flex" v-for="t in stack" :key="t">
              <span class="uppercase opacity-70">{{ t.label }}</span>
              <div
                class="mx-2 flex-grow border-t min-w-4 my-auto dark:border-white dark:border-opacity-70 border-black border-opacity-70">
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2 flex-grow">
            <div class="flex flex-row gap-2" v-for="(t, index) in stack" :key="t">
              <div class="text-center rounded p-2 flex-1 align-middle bg-mojo-600 bg-opacity-[--opacity]"
                v-for="f in t.techs" :key="f" :style="'--opacity: ' + Math.min((index + 1) * 10, 100) + '%'">
                {{ f }}
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow lg:hidden gap-2">
          <fieldset
            class="flex flex-row py-2 border rounded-md dark:border-white dark:border-opacity-70 border-black border-opacity-70"
            v-for="(t, index) in stack" :key="t">
            <div class="text-center rounded mx-2 p-2 flex-1 flex bg-mojo-600 bg-opacity-[--opacity]" v-for="f in t.techs"
              :key="f" :style="'--opacity: ' + Math.min((index + 1) * 10, 100) + '%'">
              <span class="my-auto mx-auto">{{ f }}</span>
            </div>
            <legend class="mx-auto px-2 uppercase opacity-70">{{ t.label }}</legend>
          </fieldset>
        </div>
      </div>
    </section>
    <section id="projects" class="flex flex-col gap-2">
      <h2 class="uppercase opacity-80">
        <i class="bi bi-terminal me-1"></i>{{ $t('projects.title') }}
      </h2>
      <div
        class="rounded bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 border border-black dark:border-white border-opacity-10 dark:border-opacity-10 flex flex-col">
        <div v-for="p in getLastProjects" :key="p" @click="toggleSlider(p.name)"
          class="flex flex-row gap-2 border-b p-2 cursor-pointer
          border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-5">
          <img :src="p.thumbnail" class="w-16 h-16 rounded object-cover">
          <div class="flex flex-col flex-wrap my-auto truncate">
            <h3>{{ p.name }}</h3>
            <p class="opacity-70 truncate">
              {{ p.description }}
            </p>
          </div>
        </div>
        <button type="button" @click="openSlider = !openSlider; selected = null;"
          class="m-2 p-2 text-center text-sm font-semibold leading-4 border border-mojo-600 text-mojo-600 rounded uppercase transition-all dark:hover:text-shark-900 hover:text-white hover:bg-mojo-600 disabled:opacity-50 disabled:cursor-wait">
          {{ $t('projects.show_all') }}
        </button>
      </div>
    </section>
    <section id="contacts" class="flex flex-col gap-2">
      <h2 class="uppercase opacity-80">
        <i class="bi bi-envelope me-1"></i>{{ $t('contacts.title') }}
      </h2>
      <div
        class="rounded bg-black dark:bg-white bg-opacity-5 dark:bg-opacity-5 border border-black dark:border-white border-opacity-10 dark:border-opacity-10 p-2">
        <div class="flex flex-col text-black text-opacity-70 dark:text-white dark:text-opacity-70">
          <div class="flex flex-1 flex-row flex-wrap justify-center gap-4 mb-3">
            <div class="flex flex-row">
              <i class="my-auto me-3 text-3xl bi bi-github"></i>
              <div class="flex flex-col my-auto">
                <span>GitHub</span>
                <a href="https://github.com/exi66" target="_blank"
                  class="text-mojo-600 hover:underline transition-all">@exi66</a>
              </div>
            </div>
            <div class="flex flex-row">
              <i class="my-auto me-3 text-3xl bi bi-telegram"></i>
              <div class="flex flex-col my-auto">
                <span>Telegram</span>
                <a href="https://t.me/exi666" target="_blank"
                  class="text-mojo-600 hover:underline transition-all">@exi666</a>
              </div>
            </div>
            <div class="flex flex-row">
              <i class="my-auto me-3 text-3xl bi bi-envelope-at-fill"></i>
              <div class="flex flex-col my-auto">
                <span>Email</span>
                <a href="mailto:me@exi.moe" target="_blank"
                  class="text-mojo-600 hover:underline transition-all">me@exi.moe</a>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-2 my-2">
            <div
              class="border-t border-black border-opacity-10 bg-black bg-opacity-5 dark:border-white dark:border-opacity-10 flex-1 my-auto">
            </div>
            <span class="uppercase text-xl">{{ $t('or') }}</span>
            <div
              class="border-t border-black border-opacity-10 bg-black bg-opacity-5 dark:border-white dark:border-opacity-10 flex-1 my-auto">
            </div>
          </div>
          <div class="flex-1">
            <transition name="fade">
              <div v-if="formResponse"
                class="rounded p-3 flex items-center border border-green-300 text-green-800 bg-green-50 dark:bg-shark-950 dark:text-green-400 dark:border-green-800
                aria-[errormessage='true']:text-red-800 aria-[errormessage='true']:border-red-300 dark:aria-[errormessage='true']:border-red-800 aria-[errormessage='true']:bg-red-50 dark:aria-[errormessage='true']:text-red-400"
                :aria-errormessage="formResponse.includes('Error')">
                <p>{{ formResponse }}</p>
                <button type="button" class="ms-auto -mx-1.5 -my-1.5 hover:opacity-50 transition-all"
                  @click="formResponse = null">
                  <i class="mx-2 bi bi-x-lg"></i>
                </button>
              </div>
            </transition>
            <form class="flex flex-row flex-wrap gap-2" ref="form" @submit.prevent="submit">
              <div class="flex-1 mt-2">
                <label class="uppercase text-sm dark:text-white dark:text-opacity-80 text-black
                text-opacity-80">{{ $t('contacts.name') }} <span class="text-red-500"
                    :title="$t('contacts.required')">*</span>
                  <input type="text" name="name"
                    class="mt-1 rounded-md w-full p-2 text-black dark:text-white dark:bg-shark-950 outline-none focus:ring-1 ring-mojo-600 ring-opacity-60 transition-all"
                    :placeholder="$t('contacts.name_placeholder')" required v-model="form.name">
                </label>
              </div>
              <div class="flex-1 mt-2">
                <label class="uppercase text-sm dark:text-white dark:text-opacity-80 text-black
                text-opacity-80">{{ $t('contacts.email') }} <span class="text-red-500"
                    :title="$t('contacts.required')">*</span>
                  <input type="email" name="email"
                    class="mt-1 rounded-md w-full p-2 text-black dark:text-white dark:bg-shark-950 outline-none focus:ring-1 ring-mojo-600 ring-opacity-60 transition-all"
                    :placeholder="$t('contacts.email_placeholder')" required v-model="form.email">
                </label>
              </div>
              <div class="w-full">
                <label class="uppercase text-sm dark:text-white dark:text-opacity-80 text-black
                text-opacity-80">{{ $t('contacts.message') }} <span class="text-red-500"
                    :title="$t('contacts.required')">*</span>
                  <textarea name="text"
                    class="mt-1 rounded-md w-full p-2 text-black dark:text-white dark:bg-shark-950 outline-none focus:ring-1 ring-mojo-600 ring-opacity-60 transition-all"
                    :placeholder="$t('contacts.message_placeholder')" rows="4" required autocomplete="off"
                    v-model="form.message"></textarea>
                </label>
              </div>
              <div class="flex w-full">
                <button type="submit" :disabled="waitResponse"
                  class="p-2 flex-grow text-center text-sm font-semibold leading-4 border border-mojo-600 text-mojo-600 rounded uppercase transition-all dark:hover:text-shark-900 hover:text-white hover:bg-mojo-600 disabled:opacity-50 disabled:cursor-wait">
                  {{ $t('contacts.submit') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <footer class="flex flex-col mb-4 opacity-80">
      <div class="mx-auto text-center flex">
        <img alt="favicon" src="/images/favicon.svg" width="24" title="by exi66">
        <small class="my-auto ms-2">© {{ new Date().getFullYear() }}</small>
      </div>
      <small class="my-auto mx-auto">{{ $t('footer_text') }}</small>
    </footer>
  </main>
  <transition name="fade">
    <div v-if="showToTop" class="fixed bottom-0 right-0 z-10 p-4 flex flex-row gap-2" tabindex="-1">
      <button type="button" :title="$t('to_top')" @click="toTop()"
        class="py-2 px-4 transition-all leading-none rounded bg-transparent border bg-white dark:bg-shark-950 border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-gray-100 dark:hover:bg-shark-900">
        <i class="bi bi-chevron-up"></i>
      </button>
      <button type="button" @click="toggleLang()"
        class="uppercase select-none py-2 px-4 transition-all leading-none rounded bg-transparent border bg-white dark:bg-shark-950 border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-gray-100 dark:hover:bg-shark-900">
        {{ $t('lang') }}
      </button>
      <button type="button" @click="toggleTheme()" :title="theme == 'light' ? $t('theme.dark') : $t('theme.light')"
        :aria-label="$t('theme.switch')"
        class="py-2 px-4 transition-all leading-none rounded bg-transparent border bg-white dark:bg-shark-950 border-black border-opacity-10 dark:border-white dark:border-opacity-10 hover:bg-gray-100 dark:hover:bg-shark-900 text-yellow-500 dark:text-sky-100">
        <i class="bi bi-moon-fill hidden dark:inline-block"></i>
        <i class="bi bi-brightness-high-fill inline-block dark:hidden"></i>
      </button>
    </div>
  </transition>
  <SideBar v-model:open="openSlider">
    <div class="border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 p-5 flex flex-row">
      <span class="text-2xl font-semibold">
        {{ $t('projects.title') }}
      </span>
      <div class="relative ml-auto my-auto">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <i class="bi bi-search"></i>
        </div>
        <input type="search" id="search-projects" v-model="search"
          class="block w-full px-2 py-1 ps-10 rounded text-sm border border-black border-opacity-10 dark:border-white dark:border-opacity-10 text-black dark:text-white dark:bg-shark-900 outline-none focus:border-mojo-600 focus:border-opacity-60 dark:focus:border-mojo-600 dark:focus:border-opacity-60 transition-all"
          :placeholder="$t('projects.search_placeholder')" />
      </div>
    </div>
    <div class="flex flex-col">
      <div v-for="p in searchProjects" :key="p.name" :ref="'project_' + p.name" :aria-selected="p.name == selected" class="border-b border-black border-opacity-10 dark:border-white dark:border-opacity-10 p-3 last:border-none
          aria-selected:bg-mojo-600 aria-selected:bg-opacity-10">
        <a v-if="p.url" :href="p.url" class="text-2xl mb-1 inline-block hover:underline transition-all text-mojo-600"
          target="_blank">
          {{ p.name }}
        </a>
        <span v-else class="text-2xl mb-1 inline-block">
          {{ p.name }}
        </span>
        <viewer :images="p.images" :options="{ toolbar: false, title: false }" class="flex flex-wrap gap-2">
          <img v-for="src in p.images" :key="src" :src="src"
            class="h-16 w-16 object-cover rounded bg-black cursor-zoom-in hover:scale-110 transition duration-150">
        </viewer>
        <span class="mb-1 mt-3 block uppercase font-semibold">{{ $t('projects.categories') }}:</span>
        <div class="flex flex-row flex-wrap gap-2">
          <span v-for="c in p.category" :key="c"
            class="bg-mojo-600 text-white text-opacity-80 rounded px-1 text-sm cursor-pointer hover:opacity-80 transition-all"
            @click="search = c">
            {{ c }}
          </span>
        </div>
        <span class="mb-1 mt-3 block uppercase font-semibold">{{ $t('projects.stack') }}:</span>
        <div class="flex flex-row flex-wrap gap-2">
          <span v-for="c in p.tech" :key="c"
            class="bg-mojo-600 text-white text-opacity-80 rounded px-1 text-sm cursor-pointer hover:opacity-80 transition-all"
            @click="search = c">
            {{ c }}
          </span>
        </div>
        <span class="mb-1 mt-3 block uppercase font-semibold">{{ $t('projects.details') }}:</span>
        <p class="opacity-70">
          {{ p.description }}. {{ p.details }}
        </p>
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
