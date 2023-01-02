import LinkModel from '../LinkModel'
import Link from '~~/models/Link'
import ILink from '~~/types/ILink'
import { connectMongoDB } from '~/server/lib/mongoDB'

// TODO: do we need tomove all control variables to a single file/dir??
const MAX_DOC_COUNT = 12

export default defineEventHandler(async (event) => {
  // connect to MongoDB atlas
  await connectMongoDB()

  const params = getQuery(event)
  const { limit } = params

  // NOTE: auth middleware populates the user
  const user = event?.context?.user ?? undefined

  // ONLY logged-in users can get data
  if (!user.uid) {
    throw createError({
      statusCode: 401,
      message: 'You are not allowed to see this page',
    })
  }

  // TODO: check if a user is logged in
  // TODO... if not, return unauthorized-access

  // make sure we dont pass only a Number
  let limitQ = Math.floor(Number(limit))
  if (isNaN(limitQ) || limitQ > MAX_DOC_COUNT) {
    limitQ = MAX_DOC_COUNT
  }

  const rawDocs = await LinkModel.find({
    'createdBy.uid': user.uid,
  }).sort({ createdAt: -1 })
    .limit(limitQ)
    .exec()

  // Link model makes sure the JSON object is a real Link
  const links: ILink[] = []
  rawDocs.forEach((doc) => {
    links.push(new Link(doc))
  })

  // throw createError({
  //   statusCode: 401,
  //   message: 'custom error message'
  // })

  return {
    data: links,
    error: 'no error yet',
  }
})
