<script setup>
import { defineProps, watch, ref, onMounted } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true }
})
const emits = defineEmits(['update:modelValue'])

const dialog = ref()

watch(
  () => props.modelValue,
  (newValue) => {
    const app = document.getElementById('app')
    if (newValue) {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth + 'px'
      app.style.setProperty('--scrollbar-width', scrollbarWidth)
      app.style.overflow = 'hidden'
    } else {
      app.style.overflow = 'auto'
      app.style.setProperty('--scrollbar-width', 0)
    }
    changeTabindex()
  }
)

function changeTabindex() {
  const app = document.getElementById('app')
  const buttons = app.getElementsByTagName('button')
  const links = app.getElementsByTagName('a')
  const inputs = app.getElementsByTagName('input')
  const textareas = app.getElementsByTagName('textarea')
  const all = [...buttons, ...links, ...inputs, ...textareas]

  const __buttons = dialog.value.getElementsByTagName('button')
  const __links = dialog.value.getElementsByTagName('a')
  const __inputs = dialog.value.getElementsByTagName('input')
  const __textareas = dialog.value.getElementsByTagName('textarea')
  const inside = [...__buttons, ...__links, ...__inputs, ...__textareas]

  if (props.modelValue) {
    for (const elem of all) {
      if (inside.includes(elem)) elem.removeAttribute('tabindex')
      else elem.tabIndex = -1
    }
  } else {
    for (const elem of all) {
      if (inside.includes(elem)) elem.tabIndex = -1
      else elem.removeAttribute('tabindex')
    }
  }
}

onMounted(() => changeTabindex)
</script>

<template>
  <Teleport to="body">
    <div role="dialog" ref="dialog">
      <div
        class="w-screen h-screen fixed top-0 left-0 z-10 bg-black bg-opacity-50"
        @click="emits('update:modelValue', false)"
        v-show="props.modelValue"
      ></div>
      <transition name="slide">
        <div
          class="fixed top-0 right-0 rounded-md shadow bg-white dark:bg-shark-950 z-20 min-h-screen w-4/5 md:w-3/5 lg:w-1/3"
          v-show="props.modelValue"
        >
          <div class="flex justify-start close-label bg-accent">
            <button
              type="button"
              class="pe-2 my-auto w-full hover:opacity-50 transition-all"
              @click="emits('update:modelValue', false)"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div ref="sidebarBody" class="overflow-auto max-h-screen">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<style scoped>
.close-label {
  position: absolute;
  top: 17px;
  left: -50px;
  width: 50px;
  height: 38px;
  border-radius: 1.25rem 0 0 1.25rem;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 0.3s ease-in-out 0s;
}
</style>
