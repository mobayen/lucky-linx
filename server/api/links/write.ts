import { db } from '~/server/lib/firebase'
import Link from '~~/models/Link'
import { getAtBy } from '~~/server/lib/atByHelper'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { data } = body

  // TODO: must return "unauthenticated-user" if the user does not exist
  // TODO... or "aunauthorized-access" if the user does not have sufficient permission to write

  const xlink = new Link(data)

  // TODO: (temp) fake ERROR
  if (xlink.url === 'error') {
    throw new Error('Not a real error')
  }

  let docId = null

  await db.collection('links')
    .add({
      ...xlink.toJSON(),
      ...getAtBy(event)
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
