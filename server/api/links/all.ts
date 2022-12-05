import { db } from '~/server/lib/firebase'
import Link from '~~/models/Link'
import ILink from '~~/types/ILink'

export default defineEventHandler(async (_event) => {
  const links: ILink[] = []

  await db.collection('links')
    .limit(12)
    .orderBy('metadata.createdAt', 'desc')
    .get()

    .then((data) => {
      data.docs.forEach((doc) => {
        const data = doc.data()

        const newLink = new Link({
          uid: doc.id,
          title: data.title,
          url: data.url,
          note: data.note,

          metadata: data.metadata
        })

        links.push(newLink)
      })
    })
    .catch((error) => {
      console.log('ax error', error)
    })

  // throw createError({
  //   statusCode: 401,
  //   message: 'custom error message'
  // })

  return {
    data: links,
    error: 'no error yet'
  }
})
