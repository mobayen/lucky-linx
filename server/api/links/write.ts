import Link from '~~/models/Link'
import { currentUser } from '~~/server/lib/docMetadataHelper'
// MongoDB
import { connectMongoDB } from '~/server/lib/mongoDB'
import LinkModel from '~~/server/api/LinkModel'

// TODO: https://github.com/mobayen/lucky-linx/issues/4
// TODO... user.name and user.userName are not mandatory
// TODO... but the user cannot create a linx if they are not valide

export default defineEventHandler(async (event) => {
  // connect to MongoDB atlas
  await connectMongoDB()

  const body = await readBody(event)
  const { data } = body

  const linkObj = new Link(data)

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
      message: 'The Link object is not valid',
    })
  }

  const rawDoc = await LinkModel.create({
    ...linkObj.toJSON(),
    createdBy: currentUser(event),
  })

  // TODO: how to return with an http status/error
  // TODO... setResponseStatus(404, 'custom response')
  return {
    uid: rawDoc._id ?? 'error',
  }
})
