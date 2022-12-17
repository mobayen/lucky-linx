<template>
  <div>
    <h2 class="text-2xl text-center border-b mb-4">
      @{{ usernamex }}
    </h2>

    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione atque enim excepturi autem consequuntur aspernatur sequi velit, adipisci rerum accusamus necessitatibus voluptatum qui perspiciatis dolor, a ex harum porro.
    </div>

    <gPre class="mt-4">
      {{ usernamex }}
    </gPre>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// TODO: safty check: if the user is not alphaNumberic or less than 5 characters:
// TODO... A) dont request to get data
// TODO... B) display a warning

const usernamex = route.params.username
</script>

<style scoped>

</style>
