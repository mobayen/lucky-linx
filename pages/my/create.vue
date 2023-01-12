<template>
  <div class="p-4 rounded">
    <h2 class="text-2xl text-center">
      Create a new link
    </h2>

    <form @submit.prevent="submit">
      <gInput
        v-model="linkObj.title"
        type="text"
        class="my-2 "
        label="title"
      />

      <div>
        <div v-if="!valid.title" class="bg-red-400 text-white/60 text-sm py-1 px-3 rounded">
          Not a valid Title. It cannot be more than 128 characters
        </div>
      </div>

      <gInput
        v-model="linkObj.url"
        type="text"
        class="my-2"
        label="URL"
      />

      <div>
        <div v-if="!valid.url" class="bg-red-400 text-white/60 text-sm py-1 px-3 rounded">
          Not a valid URL
        </div>
      </div>

      <gTextArea v-model="linkObj.note" label="Note" class="my-4" />

      <div class="h-4" />

      <div class="flex justify-center">
        <gButton value="this is a button" type="submit">
          Submit
        </gButton>
      </div>
    </form>

    <div class="bg-red-400">
      validate;
      <pre>{{ valid }}</pre>
    </div>

    <pre v-if="pending" class="bg-red-400"> pending... </pre>
    <pre v-else class="bg-green-400">DONE!</pre>

    <!-- TODO: create an alert/error component -->
    <div class="bg-yellow-300">
      doc id: {{ data }}
    </div>
    <div class="bg-purple-300">
      error: {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Link from '~~/models/Link'

const pending = ref(false)
const data = ref()
const error = ref()

const linkObj = reactive(new Link({
  title: '',
  url: '',
  note: '',
}))

//
definePageMeta({
  layout: 'my',
})

/// COMPUTED PROPS ///
const valid = computed(() => {
  return linkObj.validate()
})

/// METHODS/FUNCTIONS ///
async function submit () {
  // cannot submit if the object is not validate
  if (!valid.value._all) {
    return
  }

  pending.value = true
  error.value = null
  data.value = null

  await $fetch('/api/links', {
    method: 'POST',
    body: {
      data: linkObj.toJSON(),
    },
  }).then((res) => {
    data.value = res.uid
  }).catch((err) => {
    error.value = err
  }).finally(() => {
    pending.value = false
  })
  // await execute()

  if (error.value) {
    // TODO: display the error
  } else {
    // empties the variables and clears the form
    reset()
  }
}

/**
 * resets the form
 */
function reset () {
  linkObj.title = ''
  linkObj.url = ''
  linkObj.note = ''
}
</script>
