<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const { appTitle, rootUrl } = config.public

/// SEO ///
useHead({
  titleTemplate: '%s | ' + appTitle,
  link: [
    {
      rel: 'canonical',
      href: rootUrl + route.fullPath,
    },
  ],
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <layoutTheHeader class="my-4" />

    <div class="flex justify-center grow">
      <div class="m-2 p-2 lg:m-4 lg:p-4 w-luckylinx">
        <slot />
      </div>
    </div>

    <layoutTheFooter />
  </div>
</template>

<style scoped>
</style>
