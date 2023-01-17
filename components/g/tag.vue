<script setup lang="ts">
// const label = ref(' xlabel')
const current = ref('')
const tags = ref<string[]>([])

/// PROPS ///
interface IProps {
  modelValue?: string[],
  label?: string
  placeholder?: string
}
defineProps<IProps>()

// EMIT //
interface emitType {
  // (e: 'input', elementEvent: Event): void,
  (e: 'update:modelValue', val: string[]): void
}
const emit = defineEmits<emitType>()

/// FUNCITONS ///
function hit () {
  // not insert empty string
  if (!current.value) {
    return
  }

  // Avoid inserting duplicates
  const x = tags.value.findIndex((el) => {
    return el === current.value
  })
  if (x >= 0) {
    return
  }

  tags.value.push(current.value)
  current.value = ''
  emit('update:modelValue', tags.value)
}

function remove (tagName: string) {
  tags.value = tags.value.filter((el) => {
    return tagName !== el
  })
}
</script>

<template>
  <div class="">
    <label v-if="label" class="block text-gray-500/70 ml-2">
      {{ label }}
    </label>

    <div class="flex gap-3 flex-wrap bg-gray-200/50 focus:bg-gray-200/80 p-1">
      <div
        v-for="t in tags"
        :key="t"
        class="justify-center items-center inline-flex
        border-b border-gray-600/30 text-sm bg-gray-600/10 rounded-md px-2"
      >
        <button type="button" class="mr-2" @click="remove(t)">
          <gIcon icon="close" class="text-base text-gray-600/50" />
        </button>

        #{{ t }}
      </div>

      <div class="ml-4x inline-flex border-rose-600/30 border-b ">
        <gIcon icon="keyboard" class="text-base text-rose-600/50" />

        <input
          v-model="current"
          type="text"
          class="bg-transparent w-full outline-none ml-2"
          :placeholder="placeholder"
          @keydown.enter.prevent="hit"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
