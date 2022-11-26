<script setup lang="ts">

const route = useRoute()

const { form } = route.params
// console.log('x router', route.params)

</script>

<template>
  <div class="flex justify-center">
    <div v-if="form === 'login'" class="w-full md:w-2/3">
      <authLogin />
    </div>

    <div v-if="form === 'register'" class="w-full md:w-2/3">
      <authRegister />
    </div>
  </div>
</template>

<style scoped>
</style>
