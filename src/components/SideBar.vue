<script setup>
import { defineProps, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true }
})
const emits = defineEmits(['update:modelValue'])

watch(
  () => props.modelValue,
  (newValue) => {
    const app = document.getElementById('app')
    if (newValue) {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth + 'px'
      app.style.setProperty('--scrollbar-width', scrollbarWidth)
      app.style.overflow = 'hidden'
      const buttons = app.getElementsByTagName('button')
      const links = app.getElementsByTagName('a')
      const inputs = app.getElementsByTagName('input')
      const textareas = app.getElementsByTagName('textarea')
      for (const elem of [...buttons, ...links, ...inputs, ...textareas]) {
        elem.tabIndex = -1
      }
    } else {
      app.style.overflow = 'auto'
      app.style.setProperty('--scrollbar-width', 0)
      const buttons = app.getElementsByTagName('button')
      const links = app.getElementsByTagName('a')
      const inputs = app.getElementsByTagName('input')
      const textareas = app.getElementsByTagName('textarea')
      for (const elem of [...buttons, ...links, ...inputs, ...textareas]) {
        elem.removeAttribute('tabindex')
      }
    }
  }
)
</script>

<template>
  <div class="sidebar">
    <div
      class="sidebar-backdrop z-10 bg-black bg-opacity-50"
      @click="emits('update:modelValue', false)"
      v-if="props.modelValue"
    ></div>
    <transition name="slide">
      <div
        class="sidebar-panel rounded-md shadow bg-white dark:bg-shark-950 z-20 min-h-screen w-4/5 md:w-3/5 lg:w-1/3"
        v-if="props.modelValue"
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
  transition: transform 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  transition: all 150ms ease-in 0s;
}

.sidebar-backdrop {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.sidebar-panel {
  position: fixed;
  right: 0;
  top: 0;
}
</style>
