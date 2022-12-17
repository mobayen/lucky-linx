<script setup lang="ts">
import Link from '~~/models/Link'
import ILink from '~~/types/ILink'

const props =
defineProps<{
  link: ILink
}>()

const theLink = new Link(props.link)

</script>

<template>
  <div
    class="bg-gray-400/10 rounded border-2 border-gray-400/0
    p-2 pb-1 lg:p-6 lg:pb-2
  hover:border-gray-400/50 hover:bg-gray-400/20 hover:shadow-lg"
  >
    <div>
      <a :href="theLink.url" class="flex">
        <gIcon class="text-gray-600/60 pr-2" icon="link" />

        <h3 class="text-xl mb-2 text-gray-600  ">
          {{ theLink.title }}
        </h3>
      </a>
    </div>

    <div v-if="theLink.note" class="text-sm flex items-start">
      <gIcon class="text-gray-600/50 pr-2" />

      <div class="whitespace-pre-line">
        {{ theLink.note }}
      </div>
    </div>

    <div class="text-sm mt-4 text-right text-gray-800/60">
      <template v-if="theLink.createdAtFormatted">
        {{ theLink.createdAtFormatted?.value }}
        <br>
      </template>

      <template v-if="theLink.metadata?.createdBy.name && theLink.metadata?.createdBy.userName">
        by
        <NuxtLink :to="`/@${theLink.metadata?.createdBy.userName}`">
          <strong>{{ theLink.metadata?.createdBy.name }}</strong>
        </NuxtLink>
      </template>
      <strong v-else class="text-xs">
        ¯\_(ツ)_/¯
      </strong>
    </div>
  </div>
</template>

<style scoped></style>
