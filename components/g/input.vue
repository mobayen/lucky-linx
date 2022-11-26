<template>
  <div>
    <label v-if="label" class="block">
      {{ label }}
    </label>

    <input
      :type="type"
      class="border-b-2 mb-1 rounded block w-full focus:outline-none px-4 py-2 text-lg"
      @input="onInput"
    >
  </div>
</template>

<script setup lang="ts">

// PROPS //
// TODO: other types will be added as I go
interface props {
  modelValue?: string,
  type: 'text' | 'password' | 'email',
  label?: string
}

withDefaults(defineProps<props>(), {
  modelValue: '',
  type: 'text',
  label: ''
})

// EMIT //
interface emitType {
  (e: 'input', elementEvent: Event): void,
  (e: 'update:modelValue', val: string): void
}
const emit = defineEmits<emitType>()

// METHODS/FUNCTIONS //
function onInput ($event: InputEvent) {
  // TODO: what are other types other than HTMLInputElement???
  // console.log($event.target?.constructor.name ?? null)

  if ($event.target instanceof HTMLInputElement) {
    const value = $event.target.value

    // enables two-way-binding
    emit('update:modelValue', value)

    // default input behaviour
    emit('input', $event)
  }
}
</script>
