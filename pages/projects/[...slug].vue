<template>
  <div class="space-y-6 mt-8">
    <ContentDoc>
      <template v-slot="{ doc }">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink :href="localePath('/')">{{
                $t("menu.home")
              }}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink :href="localePath('/projects')">
                {{ $t("menu.projects") }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{{
                doc._file.split("/")[doc._file.split("/").length - 2]
              }}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div v-if="doc.source || doc.demo" class="flex flex-row gap-4">
          <Button
            v-if="doc.source"
            variant="link"
            as="a"
            class="p-0 h-auto"
            :href="doc.source"
            target="_blank"
            >{{ $t("projects.source")
            }}<LucideExternalLink class="h-4 w-4 ms-1" />
          </Button>
          <Button
            v-if="doc.demo"
            variant="link"
            as="a"
            class="p-0 h-auto"
            :href="doc.demo"
            target="_blank"
            >{{ $t("projects.demo") }}<LucideExternalLink class="h-4 w-4 ms-1"
          /></Button>
        </div>
        <ClientOnly>
          <viewer
            v-if="doc.images"
            :images="doc.images"
            :options="{ toolbar: false, title: false, button: false }"
            class="flex flex-row gap-4"
          >
            <div class="h-16" v-for="src in doc.images" :key="src">
              <img
                :src="src"
                class="h-16 min-w-16 w-auto object-cover rounded-md bg-card border cursor-zoom-in hover:scale-110 transition-transform"
              />
            </div>
          </viewer>
        </ClientOnly>
        <div class="markdown">
          <ContentRenderer :value="doc" />
        </div>
      </template>
      <template #not-found>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink :href="localePath('/')">{{
                $t("menu.home")
              }}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink :href="localePath('/projects')">{{
                $t("menu.projects")
              }}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>...</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="border-b border-t flex justify-center py-6">
          <div class="flex gap-2">
            <LucideFrown class="w-5 h-5 my-auto text-muted-foreground" />
            <span class="text-lg text-muted-foreground my-auto">{{
              $t("projects.document_not_found")
            }}</span>
          </div>
        </div>
      </template>
    </ContentDoc>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
</script>
