import UserModel from '~/models/User'
import { db } from '~~/server/lib/firebase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { data } = body

  console.log('x data', data)
  // console.log('x body', body)

  // TODO: add username to UserModel

  // TODO: validate the User object
  // TODO... return error: not-valid if not valid

  // TODO: return error: not-authorized or not authenticated if no user or the user does nto have permission

  // TODO: auth:user costume claims: "role" and "userName"
  const user = new UserModel(data)
  console.log('user', user)

  const userx = event?.context?.user ?? undefined
  console.log('user x', userx)

  await db.collection('profiles')
    .doc(userx.uid)
    .set({
      uid: userx.uid ?? null,
      name: userx.name ?? null,
      photoURL: userx.photoURL ?? null, // user.photoURL - which???
      email: userx.email ?? null,
      email_verified: userx.email_verified ?? null,
      phone_number: userx.phone_number ?? null,
      role: userx.role ?? null

    }).then((_docRef) => {
      // console.log('aa id', d)
      // console.log('aa path', d.path)
    }).catch((e) => {
      console.log('aa error', e)
    })

  return {
    uid: 'docId'
  }
})
