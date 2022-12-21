<template>
  <div
    v-if="auth.isLoggedIn"
    class="bg-red-400/10x w-luckylinx text-center border-b"
  >
    <span class="text-gray-500/80">
      Hi
    </span>
    <span>
      {{ auth.user?.name }}
      ({{ auth.user?.userName }})
    </span>

    <span class="text-gray-500/20 mx-2">/</span>

    <NuxtLink to="/my/" class="text-sky-500">
      Oh My!
    </NuxtLink>

    <span class="text-sky-500/20 mx-2">/</span>

    <NuxtLink to="/my/create" class="text-sky-500">
      CREATE
    </NuxtLink>

    <span class="text-sky-500/20 mx-2">/</span>

    <NuxtLink to="/my/setting" class="text-sky-500">
      SETTING
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~~/stores/authStore'
const auth = useAuth()
</script>

<style scoped>

</style>
