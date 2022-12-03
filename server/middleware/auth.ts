import { getUser } from '~~/server/lib/authHelper'

export default defineEventHandler(async (event) => {
  const { context } = event
  const user = await getUser(event)

  context.user = user
})
