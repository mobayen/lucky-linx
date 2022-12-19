<template>
  <div class="bg-blue-500 text-gray-300/80 text-xs py-1 px-3 rounded overflow-auto text-left">
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
