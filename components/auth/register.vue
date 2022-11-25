<template>
  <div class="bg-yellow-400/10 p-4 rounded border">
    <h2 class="text-2xl">
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

      <gButton value="this is a button" type="submit">
        Submit
      </gButton>
    </form>
  </div>
</template>

<script setup lang="ts">

const name = ref('')
const email = ref('')
const password = ref('')

</script>
