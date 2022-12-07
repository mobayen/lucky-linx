<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <layoutTheHeader class="my-4" />

    <div class="flex justify-center grow">
      <div class="m-4 p-4 w-luckylinx">
        <slot />
      </div>
    </div>

    <layoutTheFooter />
  </div>
</template>

<style scoped>
</style>
