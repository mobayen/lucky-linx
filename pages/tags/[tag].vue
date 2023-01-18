<script setup lang="ts">
const route = useRoute()

const { tag } = route.params
const links = ref()

await $fetch('/api/tags/find', {
  params: { tag, limit: 10 },
}).then((data) => {
  links.value = data.data
}).catch((error) => {
  console.log('x14 error', error)
})

/// SEO ///
useHead({
  title: '# ' + tag,
  meta: [
    {
      name: 'keywords',
      content: tag,
    },
  ],
})
</script>

<template>
  <div>
    <div class="text-center mb-20 mt-10">
      <h1 class="text-5xl mb-5">
        <span class="text-gray-600/70">#</span>{{ tag }}
      </h1>
      <p class="text-gray-600/70">
        You are viewing the most recently added links.
      </p>
    </div>

    <div>
      <LinkBox
        v-for="item in links"
        :key="item.uid"
        :link="item"
        class="my-2"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
