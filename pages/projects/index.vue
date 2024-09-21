<template>
  <div class="space-y-4 border-b pb-4 mt-8">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink :href="localePath('/')">{{
            $t("menu.home")
          }}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{{ $t("menu.projects") }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div>
      <h1 class="text-4xl">{{ $t("menu.projects") }}</h1>
      <div class="flex flex-wrap justify-between gap-2">
        <p class="text-lg text-muted-foreground mt-2">
          {{ $t("projects.description") }}
        </p>
        <Input
          class="w-48"
          type="search"
          name="search"
          :placeholder="$t('blog.search_placeholder')"
          v-model="search"
        />
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <template v-if="loadingProjects || projects.length < 1">
      <div v-for="i in 4" :key="i" class="border-b grid lg:grid-cols-12 py-6">
        <div class="col-span-1 lg:col-span-2">
          <div class="my-1.5">
            <Skeleton class="h-[21px] bg-muted-foreground/30 w-32 rounded-md" />
          </div>
        </div>
        <div class="col-span-1 lg:col-span-10 grid space-y-2">
          <Skeleton class="h-8 w-48 md:w-96 rounded-md bg-foreground/30" />
          <Skeleton class="h-6 w-full rounded-md bg-muted-foreground/30" />
          <Skeleton class="h-6 w-32 rounded-md" />
        </div>
      </div>
    </template>
    <template v-else-if="queryProjects.length > 0">
      <div
        v-for="b in queryProjects"
        :key="b._id"
        class="border-b grid lg:grid-cols-12 py-6"
      >
        <div class="col-span-1 lg:col-span-2">
          <div class="my-1.5">
            <time class="text-muted-foreground">{{
              new Date(b.created).toLocaleDateString([], {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}</time>
          </div>
        </div>
        <div class="col-span-1 lg:col-span-10 grid space-y-2">
          <h2>
            <Button
              as="a"
              variant="link"
              :href="localePath(b._path)"
              class="text-2xl font-semibold p-0 h-auto whitespace-normal text-foreground"
              >{{ b.title }}</Button
            >
          </h2>
          <div class="flex flex-wrap gap-2" v-if="b.tags.length > 0">
            <Badge
              v-for="t in b.tags"
              @click="search = '#' + t"
              class="cursor-pointer"
              >#{{ t }}</Badge
            >
          </div>
          <p class="text-muted-foreground">{{ b.description }}</p>
          <div>
            <Button
              as="a"
              variant="link"
              :href="localePath(b._path)"
              class="text-base p-0 h-auto"
              >{{ $t("blog.read_more") }}
            </Button>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="border-b flex justify-center py-6">
      <div class="flex gap-2">
        <LucideFrown class="w-5 h-5 my-auto text-muted-foreground" />
        <span class="text-lg text-muted-foreground my-auto">{{
          $t("blog.not_found")
        }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAppStore } from "~/stores/app.js";
import { onMounted } from "vue";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { onChangeLangProjects } = useAppStore();
const { projects, loadingProjects } = storeToRefs(useAppStore());

const search = ref("");
const queryProjects = computed(() => {
  let result = projects.value.filter((b) => b.created);
  if (search.value) {
    if (search.value.startsWith("#")) {
      const __tag = search.value.substring(1).toLocaleLowerCase();
      result = result.filter((b) =>
        b.tags.map((tag) => tag.toLocaleLowerCase()).includes(__tag)
      );
    } else {
      result = result.filter(
        (b) =>
          b.title
            .toLocaleLowerCase()
            .includes(search.value.toLocaleLowerCase()) ||
          b.description
            .toLocaleLowerCase()
            .includes(search.value.toLocaleLowerCase())
      );
    }
  }
  result.sort((a, b) => new Date(b.created) - new Date(a.created));

  return result;
});

useHead({
  title: t("menu.projects"),
});

watch(locale, () => onChangeLangProjects());
onMounted(() => onChangeLangProjects());
</script>
