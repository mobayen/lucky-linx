import { db } from '~/server/lib/firebase'
import Link from '~~/models/Link'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { data } = body

  const xlink = new Link(data)

  // TODO: (temp) fake ERROR
  if (xlink.url === 'error') {
    throw new Error('Not a real error')
  }

  let docId = null

  await db.collection('links')
    .add(xlink.toJSON())
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
