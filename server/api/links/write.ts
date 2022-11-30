import { db } from '~/server/lib/firebase'

export default defineEventHandler(async (event) => {
  // console.log('x event', event)

  const body = await readBody(event)

  const title = body.title ?? ''
  const link = body.link ?? ''
  const note = body.note ?? ''

  // TODO: (temp) fake ERROR
  if (link === 'error') {
    throw new Error('Not a real error')
  }

  let docId = null

  await db.collection('links')
    .add({ title, link, note })
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
