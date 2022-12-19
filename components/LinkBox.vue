<script setup lang="ts">
import Link from '~~/models/Link'
import ILink from '~~/types/ILink'

const props =
defineProps<{
  link: ILink
}>()

const theLink = new Link(props.link)

const theURL = computed(() => {
  try {
    return new URL(theLink.url)
  } catch (error) {
    console.log('x9 error', error)
  }

  return {
    hostname: 'invalid URL'
  }
})
</script>

<template>
  <div
    class="bg-gray-400/10 rounded border-2 border-gray-400/0
    p-2 pb-1 lg:p-6 lg:pb-2
  hover:border-gray-400/50 hover:bg-gray-400/20 hover:shadow-lg"
  >
    <div>
      <a :href="theLink.url">
        <div class="flex items-end">

          <gIcon class="text-gray-600/60 pr-2" icon="link" />

          <h3 class="text-xl text-gray-600  ">
            {{ theLink.title }}
          </h3>
        </div>

        <div class="flex items-end">
          <gIcon class="text-gray-600/60 pr-2" icon="home" />

          <h4 class="text-gray-400">
            {{ theURL.hostname }}
          </h4>
        </div>
      </a>
    </div>

    <div v-if="theLink.note" class="flex items-start mt-2">
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
