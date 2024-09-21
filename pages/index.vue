<template>
  <div class="space-y-8 mt-8">
    <section class="flex flex-row">
      <div class="w-auto hidden sm:flex my-auto mr-8 ml-8 -z-10 relative">
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
      <div class="flex flex-col gap-4">
        <h1 class="mx-auto text-3xl">
          {{ $t("hero.title") }}
          <span class="text-2xl block">
            {{ $t("hero.subtitle") }}
            <span class="text-primary">{{ $t("hero.specialization") }}</span>
          </span>
        </h1>
        <div class="flex flex-row gap-2">
          <Button
            variant="ghost"
            size="icon"
            as="a"
            href="https://github.com/exi66"
            target="_blank"
            :title="$t('hero.github')"
            class="h-auto w-auto p-2 rounded-full hover:bg-inherit hover:text-primary"
          >
            <LucideGithub class="w-7 h-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            as="a"
            href="https://t.me/exi666"
            target="_blank"
            :title="$t('hero.telegram')"
            class="h-auto w-auto p-2 rounded-full hover:bg-inherit hover:text-primary"
          >
            <LucideMessageCircleMore class="w-7 h-7" />
          </Button>
        </div>
      </div>
    </section>
    <section id="summary" class="scroll-m-16">
      <h2 class="text-xl flex gap-1 mb-2">
        <span class="w-7 h-7 flex"
          ><LucideUserCircle class="w-6 h-6 m-auto" /></span
        >{{ $t("summary.title") }}
      </h2>
      <div class="rounded border bg-card text-card-foreground p-3">
        <p>
          {{ $t("summary.text") }}
          <template v-for="i in 4">
            <span class="text-primary font-semibold">{{
              $t(`summary.tech[${i - 1}]`)
            }}</span
            >{{ i === 4 ? "." : ", " }}
          </template>
          {{ $t("summary.text4") }}<br />
          {{ $t("summary.text2") }}
          <template v-for="i in 2">
            <span class="text-primary font-semibold">{{
              $t(`summary.tech2[${i - 1}]`)
            }}</span
            >,
          </template>
          {{ $t("summary.text3") }}
          <template v-for="i in 2">
            <span class="text-primary font-semibold">{{
              $t(`summary.tech3[${i - 1}]`)
            }}</span
            >{{ i === 2 ? "." : ", " }}
          </template>
        </p>
      </div>
    </section>
    <section id="education" class="scroll-m-16">
      <h2 class="text-xl flex gap-1 mb-2">
        <span class="w-7 h-7 flex"
          ><LucideGraduationCap class="w-6 h-6 m-auto" /></span
        >{{ $t("education.title") }}
      </h2>
      <div class="rounded border bg-card text-card-foreground p-3">
        <p>
          {{ $t("education.text") }}
          <span class="text-primary font-semibold">{{
            $t(`education.degree`)
          }}</span
          >. {{ $t("education.text2") }}
          <template v-for="i in 7">
            <span class="text-primary font-semibold">{{
              $t(`education.tech[${i - 1}]`)
            }}</span
            >{{ i === 7 ? "." : ", " }}
          </template>
          {{ $t("education.text3") }}
        </p>
      </div>
    </section>
    <section id="experience" class="scroll-m-16">
      <h2 class="text-xl flex gap-1 mb-2">
        <span class="w-7 h-7 flex"
          ><LucideBriefcaseBusiness class="w-6 h-6 m-auto" /></span
        >{{ $t("experience.title") }}
      </h2>
      <ol
        class="relative mx-5 my-3 -z-10"
        v-if="loading || experience.length < 1"
      >
        <li
          class="pb-8 pl-8 border-l border-transparent"
          v-for="e in 3"
          :key="e"
        >
          <Skeleton
            class="absolute flex items-center justify-center w-8 h-8 -left-4 rounded-full bg-white ring-4 ring-ring/60"
          />
          <Skeleton class="mb-1 rounded-full h-4 p-0.5 w-32" />
          <Skeleton class="mb-3 h-3 p-0.5 rounded-full w-48" />
          <Skeleton class="h-12 rounded-lg w-full" />
        </li>
      </ol>
      <ol class="relative mx-5 my-3 -z-10" v-else>
        <li
          class="pb-8 pl-8 border-l border-primary"
          v-for="e in experience"
          :key="e"
        >
          <span
            class="absolute flex items-center justify-center w-8 h-8 leading-none -left-4 rounded-full bg-white ring-4 ring-ring/60"
            v-html="e.icon"
            :title="e.company"
          >
          </span>
          <h3 class="mb-1 text-lg leading-none">{{ e.job }}</h3>
          <span class="block mb-3 text-sm leading-none text-muted-foreground">
            <span v-if="e.company">{{ e.company + ", " }}</span>
            <time class="inline-block">{{ e.subtitle }}</time>
          </span>
          <p class="text-muted-foreground">
            {{ e.desctiption }}
          </p>
        </li>
        <li class="pl-8 border-l border-transparent">
          <span
            class="absolute flex items-center justify-center w-8 h-8 -left-4 rounded-full bg-white ring-4 ring-ring/60"
          >
            <span class="text-black font-bold">?</span>
          </span>
          <h3 class="mb-1 text-lg leading-none">...</h3>
          <span class="block mb-3 text-sm leading-none text-muted-foreground">
            {{ $t("experience.last") }}
          </span>
        </li>
      </ol>
    </section>
    <section id="tech" class="scroll-m-16">
      <h2 class="text-xl flex gap-1 mb-2">
        <span class="w-7 h-7 flex"><LucideCode2 class="w-6 h-6 m-auto" /></span
        >{{ $t("stack.title") }}
      </h2>
      <div
        class="rounded border bg-card text-card-foreground p-3"
        v-if="loading || stack.length < 1"
      >
        <div class="hidden lg:flex flex-row">
          <div class="flex flex-col gap-2">
            <div class="my-auto flex">
              <Skeleton class="w-24 h-6 rounded-full bg-foreground/80" />
              <div
                class="mx-2 flex-grow border-t min-w-4 my-auto border-muted-foreground"
              ></div>
            </div>
            <div class="my-auto flex">
              <Skeleton class="w-32 h-6 rounded-full bg-foreground/80" />
              <div
                class="mx-2 flex-grow border-t min-w-4 my-auto border-muted-foreground"
              ></div>
            </div>
            <div class="my-auto flex">
              <Skeleton class="w-16 h-6 rounded-full bg-foreground/80" />
              <div
                class="mx-2 flex-grow border-t min-w-4 my-auto border-muted-foreground"
              ></div>
            </div>
            <div class="my-auto flex">
              <Skeleton class="w-28 h-6 rounded-full bg-foreground/80" />
              <div
                class="mx-2 flex-grow border-t min-w-4 my-auto border-muted-foreground"
              ></div>
            </div>
          </div>
          <div class="flex flex-col gap-2 flex-grow">
            <div class="flex flex-row gap-2">
              <div
                class="text-center rounded flex-1 align-middle bg-[hsl(var(--primary)/var(--opacity))] animate-pulse h-10"
                style="--opacity: 10%"
              ></div>
              <div
                class="text-center rounded flex-1 align-middle bg-[hsl(var(--primary)/var(--opacity))] animate-pulse h-10"
                style="--opacity: 10%"
              ></div>
              <div
                class="text-center rounded flex-1 align-middle bg-[hsl(var(--primary)/var(--opacity))] animate-pulse h-10"
                style="--opacity: 10%"
              ></div>
            </div>
            <div class="flex flex-row gap-2">
              <div
                class="text-center rounded flex-1 align-middle bg-[hsl(var(--primary)/var(--opacity))] animate-pulse h-10"
                style="--opacity: 20%"
              ></div>
              <div
                class="text-center rounded flex-1 align-middle bg-[hsl(var(--primary)/var(--opacity))] animate-pulse h-10"
                style="--opacity: 20%"
              ></div>
            </div>
            <div class="flex flex-row gap-2">
              <div
                class="text-center rounded flex-1 align-middle bg-[hsl(var(--primary)/var(--opacity))] animate-pulse h-10"
                style="--opacity: 30%"
              ></div>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-grow lg:hidden gap-2">
          <fieldset
            class="flex flex-row gap-2 p-2 border rounded-md border-muted-foreground animate-pulse"
          >
            <legend class="mx-auto px-2">
              <Skeleton class="h-6 w-32 rounded-full bg-foreground/80" />
            </legend>
            <div
              class="text-center rounded h-10 flex-1 flex bg-[hsl(var(--primary)/var(--opacity))]"
              style="--opacity: 10%"
            ></div>
            <div
              class="text-center rounded h-10 flex-1 flex bg-[hsl(var(--primary)/var(--opacity))]"
              style="--opacity: 10%"
            ></div>
            <div
              class="text-center rounded h-10 flex-1 flex bg-[hsl(var(--primary)/var(--opacity))]"
              style="--opacity: 10%"
            ></div>
          </fieldset>
          <fieldset
            class="flex flex-row gap-2 p-2 border rounded-md border-muted-foreground animate-pulse"
          >
            <legend class="mx-auto px-2">
              <Skeleton class="h-6 w-20 rounded-full bg-foreground/80" />
            </legend>
            <div
              class="text-center rounded h-10 flex-1 flex bg-[hsl(var(--primary)/var(--opacity))]"
              style="--opacity: 20%"
            ></div>
            <div
              class="text-center rounded h-10 flex-1 flex bg-[hsl(var(--primary)/var(--opacity))]"
              style="--opacity: 20%"
            ></div>
          </fieldset>
          <fieldset
            class="flex flex-row gap-2 p-2 border rounded-md border-muted-foreground animate-pulse"
          >
            <legend class="mx-auto px-2">
              <Skeleton class="h-6 w-48 rounded-full bg-foreground/80" />
            </legend>
            <div
              class="text-center rounded h-10 flex-1 flex bg-[hsl(var(--primary)/var(--opacity))]"
              style="--opacity: 30%"
            ></div>
          </fieldset>
        </div>
      </div>
      <div class="rounded border bg-card text-card-foreground p-2" v-else>
        <div class="hidden lg:flex flex-row">
          <div class="flex flex-col gap-2">
            <div class="my-auto flex" v-for="t in stack" :key="t">
              <span>{{ t.label }}</span>
              <div
                class="mx-2 flex-grow border-t min-w-4 my-auto border-muted-foreground"
              ></div>
            </div>
          </div>
          <div class="flex flex-col gap-2 flex-grow">
            <div
              class="flex flex-row gap-2"
              v-for="(t, index) in stack"
              :key="t"
            >
              <div
                class="text-center rounded p-2 flex-1 align-middle bg-[hsl(var(--primary)/var(--opacity))]"
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
            class="flex flex-row gap-2 p-2 border rounded-md border-muted-foreground"
            v-for="(t, index) in stack"
            :key="t"
          >
            <legend class="mx-auto px-2">{{ t.label }}</legend>
            <div
              class="text-center rounded p-2 flex-1 flex bg-[hsl(var(--primary)/var(--opacity))]"
              v-for="f in t.techs"
              :key="f"
              :style="'--opacity: ' + Math.min((index + 1) * 10, 100) + '%'"
            >
              <span class="my-auto mx-auto">{{ f }}</span>
            </div>
          </fieldset>
        </div>
      </div>
    </section>
    <section id="contacts" class="scroll-m-16">
      <h2 class="text-xl flex gap-1 mb-2">
        <span class="w-7 h-7 flex"
          ><LucideMailbox class="w-6 h-6 m-auto" /></span
        >{{ $t("contacts.title") }}
      </h2>
      <div class="rounded border bg-card text-card-foreground p-3">
        <div class="flex flex-col">
          <div
            class="flex flex-1 flex-row flex-wrap justify-center gap-6 px-3 mb-3"
          >
            <div class="flex flex-row">
              <LucideGithub class="my-auto h-8 w-8 me-2" />
              <div class="flex flex-col my-auto">
                <span>GitHub</span>
                <Button
                  as="a"
                  variant="link"
                  href="https://github.com/exi66"
                  target="_blank"
                  class="p-0 h-auto justify-start"
                  >@exi66
                </Button>
              </div>
            </div>
            <div class="flex flex-row">
              <LucideMessageCircleMore class="my-auto h-8 w-8 me-2" />
              <div class="flex flex-col my-auto">
                <span>Telegram</span>
                <Button
                  as="a"
                  variant="link"
                  href="https://t.me/exi666"
                  target="_blank"
                  class="p-0 h-auto justify-start"
                  >@exi666
                </Button>
              </div>
            </div>
            <div class="flex flex-row">
              <LucideMail class="my-auto h-8 w-8 me-2" />
              <div class="flex flex-col my-auto">
                <span>Email</span>
                <Button
                  as="a"
                  variant="link"
                  href="mailto:me@exi.moe"
                  target="_blank"
                  class="p-0 h-auto justify-start"
                  >me@exi.moe
                </Button>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-2 my-2">
            <div class="border-t flex-grow my-auto"></div>
            <span class="uppercase text-xl">{{ $t("or") }}</span>
            <div class="border-t flex-grow my-auto"></div>
          </div>
          <form
            id="callback-form"
            class="grid grid-cols-2 pt-2 gap-2 scroll-m-16"
            @submit.prevent="submit"
          >
            <div>
              <Label for="name"
                >{{ $t("contacts.name") }}
                <span class="text-primary" :title="$t('contacts.required')"
                  >*</span
                ></Label
              >
              <Input
                id="name"
                type="text"
                name="name"
                v-model="form.name"
                autocomplete="on"
                class="bg-background text-foreground"
                required
              />
            </div>
            <div>
              <Label for="email"
                >{{ $t("contacts.email") }}
                <span class="text-primary" :title="$t('contacts.required')"
                  >*</span
                ></Label
              >
              <Input
                id="email"
                type="email"
                name="email"
                v-model="form.email"
                autocomplete="on"
                class="bg-background text-foreground"
                required
              />
            </div>
            <div class="col-span-2">
              <Label for="message"
                >{{ $t("contacts.message") }}
                <span class="text-primary" :title="$t('contacts.required')"
                  >*</span
                ></Label
              >
              <Textarea
                id="message"
                name="message"
                rows="4"
                required
                autocomplete="off"
                class="bg-background text-foreground"
                v-model="form.message"
              ></Textarea>
            </div>
            <Button type="submit" class="col-span-2" :disabled="waitResponse">
              {{ $t("contacts.submit") }}
            </Button>
          </form>
        </div>
      </div>
    </section>
    <ClientOnly>
      <Toaster />
    </ClientOnly>
  </div>
</template>

<script setup>
import { useAppStore } from "~/stores/app";
import {
  Laravel,
  Vue,
  MySQL,
  Ubuntu,
  Tailwind,
  Docker,
} from "@/components/icons";
import { useToast } from "@/components/ui/toast/use-toast";
import { onMounted } from "vue";

const { t, locale } = useI18n();
const {
  onChangeLangIndex,
  submit: __submit,
  waitForm: waitResponse,
} = useAppStore();
const { experience, stack, loading, form } = storeToRefs(useAppStore());
const { toast } = useToast();

async function submit() {
  const res = await __submit();
  if (res.success) {
    toast({
      title: t("contacts.success"),
      description: t("contacts.success_desc"),
    });
  } else {
    toast({
      variant: "destructive",
      title: t("contacts.error"),
      description: res.result,
    });
  }
}

useHead({
  title: t("menu.home"),
});

watch(locale, () => onChangeLangIndex());
onMounted(() => onChangeLangIndex());
</script>

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
