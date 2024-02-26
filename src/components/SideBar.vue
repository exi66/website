<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      height: 0,
    }
  },
  watch: {
    open: {
      handler: function () {
        if (this.open) document.getElementById('app').style.overflow = 'hidden';
        else document.getElementById('app').style.overflow = 'auto';
      },
    },
  },
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-backdrop z-20 bg-black bg-opacity-50" @click="$emit('update:open', false)" v-if="open"></div>
    <transition name="slide">
      <div class="sidebar-panel rounded-md shadow bg-white dark:bg-shark-950 z-30 min-h-screen w-4/5 md:w-3/5 lg:w-1/3"
        v-if="open">
        <div class="flex justify-start close-label bg-mojo-600">
          <button type="button" class="pe-2 my-auto w-full hover:opacity-50 transition-all"
            @click="$emit('update:open', false)">
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
  transition: all 150ms ease-in 0s
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
