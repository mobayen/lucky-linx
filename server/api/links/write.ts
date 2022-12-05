import { db } from '~/server/lib/firebase'
import Link from '~~/models/Link'
import { getDocMetadata } from '~~/server/lib/docMetadataHelper'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { data } = body

  // TODO: VALIDATION needed
  // TODO...
  // TODO... must return "unauthenticated-user" if the user does not exist
  // TODO... or "aunauthorized-access" if the user does not have sufficient permission to write
  // TODO... or "insufissent-data" if essential data was not present (like the URL is empty or not a URL)

  const xlink = new Link(data)

  // TODO: (temp) fake ERROR
  if (xlink.url === 'error') {
    throw new Error('Not a real error')
  }

  let docId = null

  await db.collection('links')
    .add({
      ...xlink.toJSON(),
      metadata: getDocMetadata(event)
    })
    .then((docRef) => {
      docId = docRef.id
    })
    // .catch((error) => {
    //   console.log('x error', error.message)
    // })

  // TODO: how to return with an http status/error
  // TODO... setResponseStatus(404, 'custom response')
  return {
    uid: docId
  }
})
