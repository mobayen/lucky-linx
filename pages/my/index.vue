<script setup lang="ts">
definePageMeta({
  layout: 'my'
})

const data = ref()

await $fetch('/api/links/currentUser', {
  params: {
    limit: 10
  }
}).then((res) => {
  data.value = res?.data
}).catch((err) => {
  console.log('x4 err', err)
})

</script>

<template>
  <div>
    <LinkBox
      v-for="item in data"
      :key="item.uid"
      :link="item"
      class="my-2"
    />
  </div>
</template>

<style scoped></style>
