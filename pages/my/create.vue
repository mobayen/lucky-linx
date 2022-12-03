<template>
  <div class="p-4 rounded">
    <h2 class="text-2xl text-center">
      Create a new link
    </h2>

    <form @submit.prevent="submit">
      <gInput
        v-model="title"
        type="text"
        class="my-2 "
        label="title"
      />

      <gInput
        v-model="url"
        type="text"
        class="my-2 "
        label="URL"
      />

      <gTextArea v-model="note" label="Note" class="my-4" />

      <div class="h-4" />

      <div class="flex justify-center">
        <gButton value="this is a button" type="submit">
          Submit
        </gButton>
      </div>
    </form>

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

// const docId = ref()
const pending = ref(false)
const data = ref()
const error = ref()

const title = ref('')
const url = ref('')
const note = ref('')

//
definePageMeta({
  layout: 'my'
})

// METHODS/FUNCTIONS //
async function submit () {
  pending.value = true
  error.value = null
  data.value = null

  const xlink = new Link({
    title: title.value,
    url: url.value,
    note: note.value
  })

  await $fetch('/api/links/write', {
    method: 'POST',
    body: {
      data: xlink.toJSON()
    }
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
  title.value = ''
  url.value = ''
  note.value = ''
}
</script>
