import { H3Event } from 'h3'
import User from '~~/models/User'

// TODO: experimental helper
function currentUser (event: H3Event) {
  // NOTE: auth middleware populates the user
  const userData = event?.context?.user ?? undefined
  const user = new User(userData)

  return user.toJSON()
}

export {
  currentUser,
}
