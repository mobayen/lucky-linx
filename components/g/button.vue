<template>
  <button
    class="rounded border border-gray-500/30 hover:border-gray-500/20
      text-gray-800/90 font-semibold
      px-4 py-2"
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
