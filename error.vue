<template>
  <main class="h-screen w-screen">
    <div
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white space-y-2"
    >
      <h1 class="font-semibold text-2xl">{{ $t("error.title") }}</h1>
      <p v-if="error.statusCode === 404" class="font-medium text-lg">
        {{ $t("error.404", {url: error.url}) }}
      </p>
      <p v-else class="font-medium text-lg">
        {{ $t("error.other") }}
      </p>
      <Button :href="localePath('/')" as="a">{{ $t("error.button") }}</Button>
    </div>
  </main>
</template>

<script setup>
const error = useError();
const localePath = useLocalePath();
</script>

<style scoped>
h1,
p {
  text-shadow: rgba(0, 0, 0, 0.5) 1px 0 5px;
}

main {
  background: linear-gradient(100deg, #f473cf, #98bff9, #f473cf, #98bff9);
  animation: gradient 35s ease infinite;
  background-size: 800% 800%;
  margin: 0;
  padding: 0;
}

@-webkit-keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
