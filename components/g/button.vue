<template>
  <button
    class="bg-gray-500 text-white/90 font-semibold rounded px-4 py-2"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface props {
  type?: 'button' | 'reset' | 'submit'
}

withDefaults(
  defineProps<props>(),
  {
    type: 'button'
  }
)
</script>

<style scoped>

</style>
