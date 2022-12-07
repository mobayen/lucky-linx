<script setup lang="ts">
import { Timestamp } from '@firebase/firestore'
import { ComputedRef } from 'vue'
import ILink from '~~/types/ILink'

const props =
defineProps<{
  link: ILink
}>()

// TODO: This is a temporary computed prop
// TODO... should be a Link or Metadata getter
const createdAt: ComputedRef<Date | null> = computed(() => {
  const date = props.link.metadata?.createdAt

  // TODO: take care of the _seconds and _nanoseconds
  // @ts-ignore
  const temp = new Timestamp(date?._seconds, date?._nanoseconds)

  if (temp?.seconds) {
    return temp?.toDate()
  }

  return null
})
</script>

<template>
  <div class="bg-yellow-400/10 ">
    <a :href="link.url">
      <div class="flex justify-center ">
        <div class="px-2">
          <gIcon class="text-rose-600/60 " icon="link" />
        </div>

        <h3 class="text-xl mb-2 text-center text-rose-600 flex justify-center">
          {{ link.title }}
        </h3>
      </div>

      <div v-if="link.note" class="px-10 text-sm flex">
        <div class="pr-2">
          <gIcon class="text-gray-600/50" />
        </div>

        <div>
          {{ link.note }}
        </div>
      </div>

      <div class="text-sm mt-4 text-right text-gray-800/60">
        <div>
          {{ link.metadata?.createdBy.name }}
        </div>
        <div>
          {{ createdAt ?? 'N/A' }}
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>

</style>
