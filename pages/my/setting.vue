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
    </div>

    <div class="mt-10 text-xl">
      Edit Profile:
    </div>

    <form class="mb-8" @submit.prevent="submit">
      <label for="">Name</label>
      <gInput v-model="userObj.name" />
      <div v-if="!valid.name" class="bg-red-400 text-white/60 text-sm py-1 px-3 rounded mb-4">
        Not a valid name
      </div>

      <label for="">photo</label>
      <gInput v-model="userObj.photoURL" />

      <label for="">username</label>
      <gInput v-model="userObj.userName" />
      <div v-if="!valid.userName" class="bg-red-400 text-white/60 text-sm py-1 px-3 rounded  mb-4">
        Not a valid userName
      </div>

      <div v-if="pending" class="bg-red-500">
        pending...
      </div>
      <gButton v-else type="submit">
        submit
      </gButton>
    </form>

    <gPre title="auth:user > ">
      {{ auth.user }}
    </gPre>
    <gPre>{{ valid }}</gPre>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/stores/authStore'
import UserModel from '~/models/User'

// TODO: show the status of the request
// TODO... loading, done, failed (error message)

const auth = useAuth()

const pending = ref(false)

// TODO: upload an image and pass the photo URL

const userObj = reactive(new UserModel({
  uid: auth.user?.uid ?? '',
  name: auth.user?.name ?? '',
  photoURL: auth.user?.photoURL ?? '',
  email: auth.user?.email ?? '',
  email_verified: auth.user?.email_verified ?? false,
  phone_number: auth.user?.phone_number ?? '',
  role: auth.user?.role ?? '',
  userName: auth.user?.userName ?? ''
}))

definePageMeta({
  layout: 'my'
})

const valid = computed(() => {
  return userObj.validate()
})
async function submit () {
  pending.value = true

  await auth.updateProfile({
    name: userObj.name ?? '',
    photoURL: userObj.photoURL ?? '',
    userName: userObj.userName ?? ''
  }).finally(() => {
    pending.value = false
  })
}
</script>

<style scoped></style>
