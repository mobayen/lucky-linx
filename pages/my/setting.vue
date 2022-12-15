<template>
  <div>
    <div class="text-center text-xl">
      Hi "{{ auth.user?.name }}"!
    </div>

    <div>
      <div class="my-4">
        <strong>uid: </strong>
        {{ auth.user?.uid }}
      </div>
      <div class="my-4">
        <strong>name: </strong>
        {{ auth.user?.name }}
      </div>
      <div class="my-4">
        <strong>email: </strong>
        {{ auth.user?.email }}

        (is {{ auth.user?.email_verified ? '' : 'NOT' }} verified)
      </div>
      <div class="my-4">
        <strong>phone: </strong>
        {{ auth.user?.phone_number }}
      </div>

      <pre class="bg-red-300 mt-4 overflow-auto">{{ auth.user }}</pre>
    </div>

    <div class="mt-10 text-xl">
      Edit Profile:
    </div>

    <form @submit.prevent="submit">
      <label for="">Name</label>
      <gInput v-model="name" />

      <label for="">photo</label>
      <gInput v-model="photo" />

      <div v-if="pending" class="bg-red-500">
        pending...
      </div>
      <gButton v-else type="submit">
        submit
      </gButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/stores/authStore'

// TODO: show the status of the request
// TODO... loading, done, failed (error message)

const auth = useAuth()

const name = ref(auth.user?.name)
const pending = ref(false)

// TODO: upload an image and pass the photo URL
const photo = ref(auth.user?.photoURL)

definePageMeta({
  layout: 'my'
})

async function submit () {
  pending.value = true

  await auth.updateProfile({
    name: name.value ?? '',
    photoURL: photo.value ?? ''
  }).finally(() => {
    pending.value = false
  })
}

</script>

<style scoped></style>
