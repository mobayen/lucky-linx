import { H3Event } from 'h3'
import { auth } from '~~/server/lib/firebase'

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
  let user = {
    url: event.node.req.url,
    uid: '',
    name: '',
    picture: '',
    email: '',
    email_verified: false,
    auth_time: 0,
    error: '',
    role: null
  }

  if (userIdToken) {
    // NOTE:  https://firebase.google.com/docs/auth/admin/custom-claims
    await auth
      .verifyIdToken(userIdToken)
      .then((data) => {
        // NOTE: there are more possible useful props in the "data"

        // TODO: there are "user_id" alongside with "uid" in the data
        // TODO... what is the difference ???

        user = {
          url: event.node.req.url,
          uid: data.uid ?? null,
          name: data.name ?? null,
          picture: data.picture ?? '',
          email: data.email ?? '',
          email_verified: data.email_verified ?? false,
          auth_time: data.auth_time,
          error: '',

          // Custom claim props
          role: data.role ?? null
        }
      })
      .catch((error) => {
        console.error('x2 error', error)

        user = {
          error: error.message,
          url: '',
          uid: '',
          name: '',
          picture: '',
          email: '',
          email_verified: false,
          auth_time: 0,
          role: null
        }
      })
  }

  return user
}

export {
  getUser
}
