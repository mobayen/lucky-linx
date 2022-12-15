import UserModel from '~/models/User'
import { db } from '~~/server/lib/firebase'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { data } = body

  console.log('x data', data)
  // console.log('x body', body)

  const userx = event?.context?.user ?? undefined
  console.log('user x', userx)

  const user = new UserModel({
    uid: userx.uid,

    photoURL: data.photoURL,
    name: data.name,
    userName: data.userName,

    email: userx.email,
    email_verified: userx.email_verified,
    phone_number: userx.phone_number,
    role: userx.role
  })
  console.log('user', user)

  // TODO: add username to UserModel

  // TODO: validate the User object
  // TODO... return error: not-valid if not valid

  // TODO: return error: not-authorized or not authenticated if no user or the user does nto have permission

  // TODO: auth:user costume claims: "role" and "userName"

  await db.collection('profiles')
    .doc(user.uid)
    .set({
      uid: user.uid ?? null,
      name: user.name ?? null,
      photoURL: user.photoURL ?? null, // user.photoURL - which???
      email: user.email ?? null,
      email_verified: user.email_verified ?? null,
      phone_number: user.phone_number ?? null,
      role: user.role ?? null,
      userName: user.userName

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
