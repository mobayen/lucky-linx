import { db } from '~/server/lib/firebase'
import Link from '~~/models/Link'
import { prepareDocMetadataBeforeWrite } from '~~/server/lib/docMetadataHelper'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { data } = body

  const linkObj = new Link(data)
  let docId = null

  // TODO: VALIDATION needed
  // TODO...
  // TODO... must return "unauthenticated-user" if the user does not exist
  // TODO... or "aunauthorized-access" if the user does not have sufficient permission to write
  // TODO... or "insufissent-data" if essential data was not present (like the URL is empty or not a URL)

  // if the object does not validate
  const v = linkObj.validate()
  if (!v._all) {
    throw createError({
      statusCode: 406,
      message: 'The Link object is not valid'
    })
  }

  await db.collection('links')
    .add({
      ...linkObj.toJSON(),
      metadata: prepareDocMetadataBeforeWrite(event)
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
