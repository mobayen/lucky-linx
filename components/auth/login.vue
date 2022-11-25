<template>
  <div class="bg-blue-400/10 p-4 rounded border">
    <h2 class="text-2xl">
      login form
    </h2>

    <form action="">
      <gInput
        v-model="name"
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

      <gButton value="this is a button" type="submit">
        login
      </gButton>
    </form>
  </div>
</template>

<script setup lang="ts">

const name = ref('')
const password = ref('')

</script>
