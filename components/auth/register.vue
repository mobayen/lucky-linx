<template>
  <div class="p-4 rounded">
    <h2 class="text-2xl text-center">
      Register
    </h2>

    <form action="">
      <gInput
        v-model="name"
        type="text"
        class="my-2 "
        label="Name"
      />

      <gInput
        v-model="email"
        type="email"
        class="my-2 "
        label="Email"
      />

      <gInput
        v-model="password"
        type="password"
        label="Password"
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

const name = ref('')
const email = ref('')
const password = ref('')

</script>
