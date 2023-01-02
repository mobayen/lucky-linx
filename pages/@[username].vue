<template>
  <div>
    <h2 class="text-2xl text-center border-b mb-4">
      @{{ userName }}
    </h2>

    <div>
      About the user (coming soon!)
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ratione atque enim excepturi autem consequuntur aspernatur sequi velit, adipisci rerum accusamus necessitatibus voluptatum qui perspiciatis dolor, a ex harum porro.
    </div>

    <LinkBox
      v-for="item in data"
      :key="item._id"
      :link="item"
      class="my-2"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// TODO: safty check: if the user is not alphaNumberic or less than 5 characters:
// TODO... A) dont request to get data
// TODO... B) display a warning

const userName = route.params.username

const data = ref()

await $fetch('/api/links/user', {
  params: {
    limit: 10,
    userName,
  },
}).then((res) => {
  data.value = res?.data
}).catch((err) => {
  console.log('x2 err', err)
})

</script>

<style scoped>

</style>
