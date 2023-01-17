<script setup lang="ts">
import Link from '~~/models/Link'
import ILink from '~~/types/ILink'

/// VARIABLES ///
const deletedLink = ref(false)

/// PROPS ///
const props =
defineProps<{
  link: ILink
}>()

/// VARIABLE ///
const theLink = new Link(props.link)

/// COMPUTED PROPS ///
const theURL = computed<URL | null>(() => {
  try {
    return new URL(theLink.url)
  } catch (error) {
    console.log('x1 error', error)
  }

  return null
})

/// METHODS ///
function removedLink (uid: string) {
  // hide the linkBox
  if (uid === theLink.uid) {
    deletedLink.value = true
  }
}
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

          <h4 v-if="theURL" class="truncate text-gray-300 ">
            <span class="text-gray-400 ">
              {{ theURL.hostname }}
            </span>
            <span class="text-gray-300 text-sm">
              {{ theURL.pathname }}
            </span>
            <span class="text-gray-300 text-sm">
              {{ theURL.search }}
            </span>
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

    <div v-if="theLink.tags?.length" class="flex items-start my-2">
      <gIcon icon="tag" class="text-gray-600/50 pr-2 " />

      <div
        v-for="t in theLink.tags"
        :key="t"
        class="badge bg-stone-300 text-stone-600 m-px"
      >
        <NuxtLink :to="`/tags/${t}`">
          <span class="text-gray-600/70">#</span>{{ t }}
        </NuxtLink>
      </div>
    </div>

    <div class="mt-4 pt-2 border-t">
      <div v-if="deletedLink" class="bg-rose-500 text-white/80 py-1 px-2 rounded">
        Deleted!
      </div>
      <div v-else class="flex gap-2">
        <div class="flex-1">
          <authLinkControl
            :link="theLink"
            @delete="removedLink"
          />
        </div>
        <div class="text-sm text-right text-gray-800/60">
          <template v-if="theLink.createdAtFormatted">
            {{ theLink.createdAtFormatted?.value }}
            <br>
          </template>

          <template v-if="theLink.metadata?.createdBy.userName">
            by
            <NuxtLink :to="`/@${theLink.metadata?.createdBy.userName}`">
              <strong>{{ theLink.metadata?.createdBy.name }}</strong>
            </NuxtLink>
          </template>
          <span v-else-if="theLink.metadata?.createdBy.name">
            by
            {{ theLink.metadata?.createdBy.name }}
          </span>
          <strong v-else>
            ¯\_(ツ)_/¯
          </strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
