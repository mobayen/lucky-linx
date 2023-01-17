<script setup lang="ts">
const route = useRoute()
const tag = route.params.tag
</script>

<template>
  <div>
    <div class="text-5xl text-center mb-20 mt-10">
      {{ tag }}
    </div>

    <div>
      <p>
        links with the
        <strong>"{{ tag }}"</strong>
        hashtag will be listed here.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, laudantium? Dolorem, sequi quaerat. Inventore enim dolor qui animi deserunt vero sequi laudantium, error doloremque non illum architecto, aperiam ea. Repellat?
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
