<script setup lang="ts">

const data = ref()
const errS = ref()
const errC = ref()

await $fetch('/api/links/all', {
  params: {
    limit: 10,
  },
}).then((res) => {
  data.value = res?.data
  errS.value = res?.error
}).catch((err) => {
  console.log('x3 err', err)
  errC.value = err
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
        <NuxtLink to="/my?f=login">
          login
        </NuxtLink>
        or
        <NuxtLink to="/my?f=register">
          register
        </NuxtLink>
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

<style scoped>
</style>
