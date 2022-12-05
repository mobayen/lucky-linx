<script setup lang="ts">

const data = ref()
const errS = ref()
const errC = ref()

await $fetch('/api/links/all', {
  params: {
    limit: 10
  }
})
  .then((res) => {
    data.value = res?.data
    errS.value = res?.error
  })
  .catch((err) => {
    console.log('x err', err)
    errC.value = err
  })

</script>

<template>
  <div>
    <div>
      <div
        v-for="item in data"
        :key="item.uid"
        class="bg-yellow-400/10 my-2 p-6"
      >
        <LinkBox :link="item" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
