import {computed, reactive} from "vue";
import {defineStore} from "pinia";
import {useI18n, useLocalePath, queryContent, useCsrf} from "#imports";
import axios from "axios";

export const useAppStore = defineStore("app", () => {
  const {locale} = useI18n();
  const localePath = useLocalePath();

  async function onChangeLangIndex() {
    await fetchExperience();
    await fetchStack();
  }

  async function onChangeLangBlog() {
    await fetchBlogs();
  }

  async function onChangeLangProjects() {
    await fetchProjects();
  }

  const __experience = reactive({
    ru: null,
    en: null,
  });

  async function fetchExperience() {
    if (!__experience[locale.value]) {
      loadingExperience.value = true;
      const res = await axios.get(`/data/${locale.value}/experience.json`);
      __experience[locale.value] = res.data;
      loadingExperience.value = false;
    }
  }

  const __stack = reactive({
    ru: null,
    en: null,
  });

  async function fetchStack() {
    if (!__stack[locale.value]) {
      loadingStack.value = true;
      const res = await axios.get(`/data/${locale.value}/stack.json`);
      __stack[locale.value] = res.data;
      loadingStack.value = false;
    }
  }

  const experience = computed(() => __experience[locale.value] || []);
  const stack = computed(() => __stack[locale.value] || []);
  const loadingExperience = ref(false);
  const loadingStack = ref(false);
  const loading = computed(() => loadingExperience.value || loadingStack.value);

  const __blogs = reactive({
    ru: null,
    en: null,
  })
  const blogs = computed(() => __blogs[locale.value] || []);
  const loadingBlogs = ref(false)

  const __projects = reactive({
    ru: null,
    en: null,
  })
  const projects = computed(() => __projects[locale.value] || []);
  const loadingProjects = ref(false)

  async function fetchProjects() {
    if (!__projects[locale.value]) {
      loadingProjects.value = true;
      queryContent(localePath("/projects"))
        .where({_type: "markdown"})
        .without("body")
        .find()
        .then((data) => {
          __projects[locale.value] = data;
          loadingProjects.value = false;
        });
    }
  }

  async function fetchBlogs() {
    if (!__blogs[locale.value]) {
      loadingBlogs.value = true;
      queryContent(localePath("/blog"))
        .where({_type: "markdown"})
        .without("body")
        .find()
        .then((data) => {
          __blogs[locale.value] = data;
          loadingBlogs.value = false;
        });
    }
  }

  const {csrf} = useCsrf();
  const __waitForm = ref(false);
  const waitForm = computed(() => __waitForm.value);
  const form = ref({
    name: "",
    email: "",
    message: ""
  })

  async function submit() {
    __waitForm.value = true;
    try {
      const body = new URLSearchParams(form.value).toString();
      let res = await axios.post("/api/submit/", body, {
        headers: {
          "csrf-token": csrf,
        },
      });
      if (res.status === 200 && res.data.success) {
        __waitForm.value = false;
        form.value = {
          name: "",
          email: "",
          message: ""
        }
        return {success: true, result: res.data}
      } else {
        __waitForm.value = false;
        return {success: false, result: res.data}
      }
    } catch (e) {
      __waitForm.value = false;
      return {success: false, result: e.message}
    }
  }

  return {
    experience,
    stack,
    onChangeLangIndex,
    onChangeLangBlog,
    onChangeLangProjects,
    loading,
    blogs,
    loadingBlogs,
    loadingProjects,
    projects,
    form,
    submit,
    waitForm
  };
});
