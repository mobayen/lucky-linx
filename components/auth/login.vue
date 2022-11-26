<template>
  <div class="p-4 rounded">
    <h2 class="text-2xl text-center">
      Log in
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
const password = ref('')

</script>
