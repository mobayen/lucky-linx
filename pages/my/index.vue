<script setup lang="ts">
definePageMeta({
  layout: 'my',
})

const data = ref()

await $fetch('/api/links/currentUser', {
  params: {
    limit: 10,
  },
}).then((res) => {
  data.value = res?.data
}).catch((err) => {
  console.log('x4 err', err)
})

</script>

<template>
  <div>
    <div v-if="!data.length" class="text-center">
      <div v-once class="font-semibold">
        No data yet!
      </div>
      <div>
        You can start by
        <NuxtLink to="/my/create">
          creating
        </NuxtLink>
        the first link!
      </div>
    </div>

    <LinkBox
      v-for="item in data"
      :key="item.uid"
      :link="item"
      class="my-2"
    />
  </div>
</template>

<style scoped></style>
