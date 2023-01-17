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

      <gTag v-model="linkObj.tags" label="Tag x " placeholder="create a tag" />

      <div class="h-4" />

      <div class="flex justify-center">
        <div v-if="pending">
          Pending...
        </div>
        <gButton v-else value="this is a button" type="submit">
          Submit
        </gButton>
      </div>
    </form>

    <div class="m-4" />

    <!-- TODO: create an alert/error component -->
    <div v-if="docUId" class="bg-yellow-300 p-2 rounded">
      Just created: {{ docUId }}
    </div>

    <div v-if="error" class="bg-purple-300">
      error: {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import Link from '~~/models/Link'

const pending = ref(false)
const docUId = ref()
const error = ref()

const linkObj = reactive(new Link({
  title: '',
  url: '',
  note: '',
  tags: [],
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
  docUId.value = null

  await $fetch('/api/links/write', {
    method: 'POST',
    body: {
      data: linkObj.toJSON(),
    },
  }).then((res) => {
    docUId.value = res.uid
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
