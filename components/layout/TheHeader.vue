<script setup lang="ts">
import { useAuth } from '~/stores/authStore'

const auth = useAuth()

const links = [
  {
    title: 'Home',
    target: '/'
  },
  {
    title: 'About',
    target: '/'
  }
]

async function signOut () {
  await auth.signOut()
}
</script>

<template>
  <div class="bg-yellow-300/80 flex justify-center">
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
        <template
          v-for="link in links"
          :key="link.title"
        >
          <NuxtLink
            :to="link.target"
            class="text-rose-500 mx-2"
          >
            {{ link.title }}
          </NuxtLink>

          <span class="text-rose-500/30">
            /
          </span>
        </template>

        <span class="text-sky-500/30">
          /
        </span>

        <template v-if="auth.isLoggedIn">
          <button type="button" class="text-sky-500 mx-2" @click="signOut">
            Sign out
          </button>
        </template>

        <template v-else>
          <NuxtLink to="/auth/register" class="text-sky-500 ml-2 mr-1x">
            Register
          </NuxtLink>

          <span class="text-sky-500/30 mx-1x">
            /
          </span>

          <NuxtLink to="/auth/login" class="text-sky-500 ml-1x">
            Log in
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
