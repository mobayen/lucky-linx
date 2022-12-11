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
  <div class="bg-yellow-300 flex justify-center">
    <div class="p-4 flex items-center justify-between w-luckylinx">
      <!-- right -->
      <div>
        <NuxtLink to="/" class="flex">
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
        </NuxtLink>
      </div>

      <!-- left -->
      <div class="flex">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="text-rose-500">
            <gIcon icon="more_vert" />
          </label>

          <div tabindex="0" class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 text-left">
            <template
              v-for="link in links"
              :key="link.title"
            >
              <NuxtLink
                :to="link.target"
                class="text-rose-500 m-1"
              >
                {{ link.title }}
              </NuxtLink>
            </template>

            <div class="border border-b-sky-500/20" />

            <template v-if="auth.isLoggedIn">
              <NuxtLink to="/my" class="text-sky-500 m-1">
                Oh My
              </NuxtLink>

              <button type="button" class="text-sky-500 m-1 text-left" @click="signOut">
                Sign out
              </button>
            </template>

            <template v-else>
              <NuxtLink to="/my?f=register" class="text-sky-500 m-1">
                Register
              </NuxtLink>

              <NuxtLink to="/my?f=login" class="text-sky-500 m-1">
                Log in
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
