<script setup lang="ts">
// TODO: Only authenticated users

import { useAuth } from '~~/stores/authStore'

const auth = useAuth()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <layoutTheHeader class="my-4" />

    <div class="flex flex-col justify-center items-center grow">
      <layoutMyNav v-if="auth.isLoggedIn" />

      <div
        v-if="auth.isLoggedIn"
        class="m-4 p-4 w-luckylinx grow"
      >
        <slot />
      </div>

      <div v-else>
        YOU NEED TO
        <NuxtLink class="text-sky-500 underline" t0="auth/login">
          LOGG IN
        </NuxtLink>
        OR
        <NuxtLink class="text-sky-500 underline" t0="auth/login">
          REGISTER
        </NuxtLink>
        FIRST!
      </div>
    </div>

    <layoutTheFooter />
  </div>
</template>

<style scoped>
</style>
