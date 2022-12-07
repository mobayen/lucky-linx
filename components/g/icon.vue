<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string;
}>(), {
  icon: 'blur_on'
})
</script>

<template>
  <span class="flex items-center justify-center material-icons-outlined ">
    {{ icon }}
  </span>
</template>
