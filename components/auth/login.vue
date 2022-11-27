<template>
  <div class="p-4 rounded">
    <h2 class="text-2xl text-center">
      Log in
    </h2>

    <form @submit.prevent="submit">
      <gInput
        v-model="email"
        type="email"
        class="my-2 "
        label="email"
      />

      <gInput
        v-model="password"
        type="password"
        label="password"
        class="my-2"
      />

      <div class="h-4" />

      <div class="flex justify-center">
        <gButton value="this is a button" type="submit">
          Submit
        </gButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/stores/authStore'

const auth = useAuth()

const email = ref('')
const password = ref('')

async function submit () {
  await auth.signInUser(email.value, password.value)
}
</script>
