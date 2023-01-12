import Link from '~~/models/Link'
import { db } from '~~/server/lib/firebase'

export default defineEventHandler(async (event) => {
  // NOTE: auth middleware populates the user
  const user = event?.context?.user ?? undefined

  const body = await readBody(event)
  // const { link } = body
  const link = new Link(body.link)

  if (!link?.uid) {
    throw createError({
      statusCode: 400,
      message: 'The document you are trying to access is not valid. ',
    })
  }

  // if the current user is not the owner
  if (user.uid !== link?.metadata?.createdBy.uid) {
    throw createError({
      statusCode: 401,
      message: 'You do not have permission to delete this document.',
    })
  }

  const res = await db.collection('links')
    .doc(link.uid)
    .delete()

  return {
    data: {
      res: 'deleted',
      date: res.writeTime.toDate(),
    },
  }
})
