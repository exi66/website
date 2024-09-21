<template>
  <div class="space-y-6 mt-8">
    <ContentDoc>
      <template v-slot="{ doc }">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink :href="localePath('/')">
                {{ $t("menu.home") }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <BreadcrumbLink :href="localePath('/blog')">
                {{ $t("menu.blog") }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <BreadcrumbPage>{{ doc._file.split('/')[doc._file.split('/').length - 2] }}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="markdown">
          <ContentRenderer :value="doc"/>
        </div>
      </template>
      <template #not-found>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink :href="localePath('/')">
                {{ $t("menu.home") }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <BreadcrumbLink :href="localePath('/blog')">
                {{ $t("menu.blog") }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <BreadcrumbPage>...</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div class="border-b border-t flex justify-center py-6">
          <div class="flex gap-2">
            <LucideFrown class="w-5 h-5 my-auto text-muted-foreground"/>
            <span class="text-lg text-muted-foreground my-auto">{{ $t('blog.document_not_found') }}</span>
          </div>
        </div>
      </template>
    </ContentDoc>
  </div>
</template>

<script setup>
const localePath = useLocalePath();
</script>