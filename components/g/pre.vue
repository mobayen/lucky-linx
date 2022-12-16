<template>
  <div class="bg-yellow-300 text-gray-700/80 text-xs py-1 px-3 rounded  overflow-auto">
    <strong>{{ title }}</strong>
    <pre class=""><slot /></pre>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  title?: string
}

defineProps<IProps>()
</script>
