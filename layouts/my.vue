<script setup lang="ts">
// Only authenticated users
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <layoutTheHeader class="my-4" />

    <div class="flex flex-col justify-center items-center grow">
      <layoutMyNav />

      <div class="m-4 p-4 w-luckylinx grow">
        <slot />
      </div>
    </div>

    <layoutTheFooter />
  </div>
</template>

<style scoped>
</style>
