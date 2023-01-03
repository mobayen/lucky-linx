import { db } from '~/server/lib/firebase'
import Link from '~~/models/Link'
import { massageMetadataAfterFetch } from '~~/server/lib/docMetadataHelper'
import ILink from '~~/types/ILink'

// TODO: do we need tomove all control variables to a single file/dir??
const MAX_DOC_COUNT = 12

export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  const { limit, userName } = params

  // TODO: check if a user is logged in
  // TODO... if not, return unauthorized-access

  // make sure we dont pass only a Number
  let limitQ = Math.floor(Number(limit))
  if (isNaN(limitQ) || limitQ > MAX_DOC_COUNT) {
    limitQ = MAX_DOC_COUNT
  }

  const links: ILink[] = []

  await db.collection('links')
    .where('metadata.createdBy.userName', '==', userName)
    .limit(limitQ)
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

          metadata: massageMetadataAfterFetch(data.metadata)
        })

        links.push(newLink)
      })
    }).catch((error) => {
      console.log('x10 error', error)
    })

  // throw createError({
  //   statusCode: 401,
  //   message: 'custom error message'
  // })

  return {
    data: links
  }
})
