import UserModel from '~/models/User'
import { db, auth } from '~~/server/lib/firebase'

// TODO: roles are not need more security checks
// TODO... a default super admin must be set as an env variable
// TODO... ONLY a super admin can modify "claim.role" value
// TODO... return a "not-enough-permission" if the user cannot set "role"

// TODO: validate the User
// TODO... before create or update

// TODO: https://github.com/mobayen/lucky-linx/issues/4
// TODO... user.name and user.userName are not mandatory
// TODO... but the user cannot create a linx if they are not valide

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { data } = body

  const userx = event?.context?.user ?? undefined

  const user = new UserModel({
    uid: userx.uid,

    photoURL: data.photoURL,
    name: data.name,
    userName: data.userName,
    about: data.about,

    email: userx.email,
    email_verified: userx.email_verified,
    phone_number: userx.phone_number,

    role: '',
  })

  // TODO: validate the User object
  // TODO... return error: not-valid if not valid

  // TODO: return error: not-authorized or not authenticated if no user or the user does nto have permission

  await db.collection('profiles')
    .doc(user.uid)
    .set({
      uid: user.uid ?? null,
      name: user.name ?? null,
      photoURL: user.photoURL ?? null, // user.photoURL - which???
      email: user.email ?? null,
      email_verified: user.email_verified ?? null,
      phone_number: user.phone_number ?? null,
      userName: user.userName ?? null,
      role: '',
      about: user.about ?? null,
    }).catch((_err) => {
      console.error('x error(1)', _err)

      // TODO: throw or return the error
    })

  // firebase/auth: set the custom claims for the user
  set(user.uid, {
    role: '',
    userName: user.userName ?? '',
  })

  return {
    uid: 'docId',
  }
})

/**
 * Set custom claims
 *
 * NOTE: custom-claims has a 1000 bytes limitation in size
 *
 * @param userId
 * @param options
 */
async function set (
  userId: string,
  options?: {
    role: string,
    userName: string,
  },
) {
  await auth.setCustomUserClaims(userId, {
    role: options?.role ?? '',
    userName: options?.userName,
  }).then(() => {
    // everything went fine
  }).catch((_err) => {
    // TODO: throw or return the error
  })
}
