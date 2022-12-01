<script setup lang="ts">
// Only authenticated users
</script>

<template>
  <div class="">
    <layoutTheHeader class="my-4" />

    <div class="flex flex-col justify-center items-center">
      <layoutMyNav />

      <div class="m-4 p-4 w-luckylinx">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
