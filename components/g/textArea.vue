<template>
  <div>
    <label v-if="label" class="block text-gray-500/70 ml-2">
      {{ label }}
    </label>

    <textarea
      class="mb-1 px-4 py-2 w-full block
        border rounded focus:border-gray-400/80
        focus:outline-none text-lg bg-gray-200/50 focus:bg-gray-200/80 "
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">

// PROPS //
// TODO: other types will be added as I go
interface props {
  modelValue?: string | number | string[] | undefined,
  label?: string
  placeholder?: string
}

withDefaults(defineProps<props>(), {
  modelValue: '',
  label: '',
  placeholder: '',
})

// EMIT //
interface emitType {
  (e: 'input', elementEvent: Event): void,
  (e: 'update:modelValue', val: string): void
}
const emit = defineEmits<emitType>()

// METHODS/FUNCTIONS //
function onInput ($event: InputEvent) {
  // TODO: what are other types other than HTMLInputElement & HTMLTextAreaElement???

  if ($event.target instanceof HTMLTextAreaElement) {
    const value = $event.target.value

    // enables two-way-binding
    emit('update:modelValue', value)

    // default input behaviour
    emit('input', $event)
  }
}
</script>
