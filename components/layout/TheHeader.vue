<script setup lang="ts">
const links = [
  {
    title: 'Home',
    target: '/'
  },
  {
    title: 'About',
    target: '/about'
  },
  {
    title: 'login',
    target: '/auth/login'
  },
  {
    title: 'register',
    target: '/auth/register'
  }
]
</script>

<template>
  <div class="bg-gray-500/20 flex justify-center">
    <div class="p-4 flex items-center justify-between w-luckylinx">
      <!-- right -->
      <div class="flex">
        <div class="w-14 m-2">
          <img src="/ll-logo.png" alt="">
        </div>
        <div class="mx-2">
          <div class="text-3xl text-gray-700/80 font-Merriweather">
            LuckyLinx
          </div>
          <div class="text-sm text-gray-800/50">
            Let's get linked to the world
          </div>
        </div>
      </div>

      <!-- left -->
      <div class="flex">
        <div v-for="link in links" :key="link.title" class="text-rose-500 m-1 p-1">
          <a :href="link.target">
            {{ link.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
