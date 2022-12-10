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
  <div
    class="bg-gray-400/10 rounded border-2 border-gray-400/0
  hover:border-gray-400/50 hover:bg-gray-400/20 hover:shadow-lg"
  >
    <a :href="link.url">
      <div class="flex">
        <gIcon class="text-gray-600/60 pr-2" icon="link" />

        <h3 class="text-xl mb-2 text-gray-600  ">
          {{ link.title }}
        </h3>
      </div>

      <div v-if="link.note" class="text-sm flex">
        <gIcon class="text-gray-600/50 pr-2" />

        <div>
          {{ link.note }}
        </div>
      </div>

      <div class="text-sm mt-4 text-right text-gray-800/60">
        <div>
          by
          <strong v-if="link.metadata?.createdBy.name">
            {{ link.metadata?.createdBy.name }}
          </strong>

          <template v-else>
            <span>&#x1F631;</span>
          </template>
        </div>
        <div>
          {{ createdAt ?? 'N/A' }}
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped></style>
