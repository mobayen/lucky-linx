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
  <div>
    <a :href="link.url">
      <h3 class="text-xl mb-2 text-center text-red-400">
        {{ link.title }}

      <!-- TODO: an icon to indicate it is a link and will open in a new tab -->
      </h3>

      <div class="px-10 text-gray-900/80">
        {{ link.note }}
      </div>

      <div class="text-sm mt-4 text-right">
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
