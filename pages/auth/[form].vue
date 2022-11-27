<script setup lang="ts">
import { useAuth } from '~/stores/authStore'

const route = useRoute()
const { form } = route.params

const auth = useAuth()

</script>

<template>
  <div class="flex justify-center flex-col items-center">
    <div v-if="form === 'login'" class="w-full md:w-2/3">
      <authLogin />
    </div>

    <div v-if="form === 'register'" class="w-full md:w-2/3">
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
</template>

<style scoped>
</style>
