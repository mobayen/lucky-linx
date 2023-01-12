
<template>
  <div v-if="ownerIsLoggedin">
    <gButton class="mx-1" @click="remove">
      <gIcon icon="delete" />
    </gButton>
    <!-- <gButton class="mx-1" @click="edit">
      Edit
    </gButton> -->
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '~~/stores/authStore'
import ILink from '~~/types/ILink'

const auth = useAuth()

/// PROPS ///
const props = defineProps<{
  link: ILink
}>()

/// EMITS ///
interface IEmits {
  (e: 'delete', uid: string): void
}
const emits = defineEmits<IEmits>()

/// METHODS ///
async function remove () {
  const confirmDelete = await confirm('You are deleting the link!')

  if (confirmDelete) {
    await $fetch('/api/links/delete', {
      method: 'DELETE',
      body: {
        link: props.link,
      },
    }).then((_data) => {
      // TODO: do we need link validation before sending request???
      // if the link.uid was undefined, the DELETE job definetely fails
      emits('delete', props.link.uid ?? 'BAD LINK UID')
    }).catch((err) => {
      console.log('x13 error', err)

      alert('Oops, something went wrong. Please try again later or contact customer support if the problem persists.')
    })
  }
}

// function edit () {
//   alert('edit')
// }

/// COMPUTED PROPS ///
const ownerIsLoggedin = computed(() => {
  return props.link.metadata?.createdBy.uid === auth.user?.uid
})
</script>
