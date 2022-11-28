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
        v-model="link"
        type="text"
        class="my-2 "
        label="link"
      />

      <gTextArea v-model="note" label="Note" class="my-4" />

      <div class="h-4" />

      <div class="flex justify-center">
        <gButton value="this is a button" type="submit">
          Submit
        </gButton>
      </div>
    </form>

    <!-- TODO: create an alert/error component -->
    <div v-if="docId" class="bg-red-300">
      doc id: {{ docId }}
    </div>
  </div>
</template>

<script setup lang="ts">

const docId = ref()

const title = ref('')
const link = ref('')
const note = ref('')

// METHODS/FUNCTIONS //
async function submit () {
  const { data, error } = await useFetch('/api/links/write', {
    method: 'POST',
    body: {
      title: title.value,
      link: link.value,
      note: note.value
    }
  })

  docId.value = data.value?.uid

  if (error.value) {
    // TODO: display the error
  } else {
    // empties the variables and clears the form
    reset()
  }
}

function reset () {
  title.value = ''
  link.value = ''
  note.value = ''
}
</script>
