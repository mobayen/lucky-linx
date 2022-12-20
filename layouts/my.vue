<script setup lang="ts">
import { useAuth } from '~~/stores/authStore'

const router = useRouter()
const auth = useAuth()

const form = computed(() => {
  // NOTE: for some reason route "useRoute()" does not work properly on the first load
  return router.currentRoute.value.query?.f === 'register' ? 'register' : 'login'
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <layoutTheHeader class="my-4" />

    <div class="flex flex-col justify-center items-center grow">
      <layoutMyNav v-if="auth.isLoggedIn" />

      <div
        v-if="auth.isLoggedIn"
        class="m-4 p-4 grow w-luckylinx"
      >
        <slot />
      </div>

      <div v-else class="w-luckylinx">
        <div v-if="form === 'login'">
          <authLogin />
        </div>

        <div v-if="form === 'register'">
          <authRegister />
        </div>

        <div class="h-2" />

        <!-- TODO: create an error component -->
        <div v-if="auth.hasError" class="bg-red-300/20 px-4 py-2 rounded w-full mt-10">
          <div class="text-red-800 border-b border-gray-500/20 mb-2 ">
            {{ auth.error?.code }}
          </div>

          <div class="text-red-400">
            {{ auth.error?.message }}
          </div>
        </div>
      </div>
    </div>

    <layoutTheFooter />
  </div>
</template>

<style scoped>
</style>
