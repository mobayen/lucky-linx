import { H3Event } from 'h3'
import { auth } from '~~/server/lib/firebase'
import User from '~~/models/User'

async function getUser (event: H3Event) {
  const userCookie = getCookie(event, '__session') ?? ''

  let userIdToken = null

  try {
    const session = JSON.parse(userCookie)
    userIdToken = session.idToken
  } catch (error) {
    userIdToken = null
  }

  // int the user object
  let user = new User()

  if (userIdToken) {
    // NOTE:  https://firebase.google.com/docs/auth/admin/custom-claims
    await auth
      .verifyIdToken(userIdToken)
      .then((data) => {
        // NOTE: there are more possible useful props in the "data"

        // TODO: there are "user_id" alongside with "uid" in the data
        // TODO... what is the difference ???

        // TODO: Are these useful? maybe to authorizing user access ???
        // TODO... request URL, auth time
        // url: event.node.req.url,
        // auth_time: data.auth_time,

        user = new User({
          uid: data.uid ?? null,
          name: data.name ?? null,
          photoURL: data.picture ?? null,
          email: data.email ?? null,
          email_verified: data.email_verified ?? false,
          phone_number: data.phone_number ?? null,

          // Custom claim props
          role: data.role ?? null,
          userName: data.userName ?? null
        })
      }).catch((error) => {
        // TODO: handle error??
        console.error('x8 error', error)

        // clears the user
        user = new User()
      })
  }

  return user
}

export {
  getUser
}
