<template>
  <div>
    <h2 class="text-2xl text-center border-b mb-4">
      @{{ userName }}
    </h2>

    <div v-if="userBrief?.about" class="flex justify-center mb-8">
      <div class="w-2/3 text-gray-600/80 text-sm">
        {{ userBrief.about }}
      </div>
    </div>

    <LinkBox
      v-for="item in links"
      :key="item.uid"
      :link="item"
      class="my-2"
    />
  </div>
</template>

<script setup lang="ts">
import Link from '~~/models/Link'
import ILink from '~~/types/ILink'

const route = useRoute()

// TODO: safty check: if the user is not alphaNumberic or less than 5 characters:
// TODO... A) dont request to get data
// TODO... B) display a warning

// TODO: if the returned user was empty/null
// TODO... display a warning "wrong userName"

const userName = route.params.username

const tempLinks = ref()
const userBrief = ref()

await $fetch('/api/links/user', {
  params: {
    limit: 10,
    userName,
  },
}).then((res) => {
  const { links, user } = res?.data
  tempLinks.value = links
  userBrief.value = user
}).catch((err) => {
  console.log('x2 err', err)
})

/// COMPUTED ///
const links = computed(() => {
  const temp: ILink[] = []

  tempLinks.value.forEach((l: ILink) => {
    temp.push(new Link(l))
  })

  return temp
})

/// SEO ///
useHead({
  title: userBrief.value.name + ' (@' + userBrief.value.userName + ')',
  meta: [
    {
      name: 'description',
      content: userBrief.value.about ?? '',
    },
  ],
})
</script>
