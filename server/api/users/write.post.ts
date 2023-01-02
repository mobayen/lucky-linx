import UserModel from '~/models/User'
import {
  // db,
  auth,
} from '~~/server/lib/firebase'
import { connectMongoDB } from '~/server/lib/mongoDB'

import ProfileModel from '~/server/api/ProfileModel'

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
  // connect to MongoDB atlas
  await connectMongoDB()

  const body = await readBody(event)
  const { data } = body

  const userx = event?.context?.user ?? undefined

  const user = new UserModel({
    uid: userx.uid,

    photoURL: data.photoURL,
    name: data.name,
    userName: data.userName,

    email: userx.email,
    email_verified: userx.email_verified,
    phone_number: userx.phone_number,

    role: '',
  })

  // TODO: validate the User object
  // TODO... return error: not-valid if not valid

  // TODO: return error: not-authorized or not authenticated if no user or the user does nto have permission

  // TODO: handle errors
  let xprofile = await ProfileModel
    .findOneAndUpdate(
      { uid: userx.uid },
      {
        // uid: user.uid,
        name: user.name,
        photoURL: user.photoURL,
        // email: user.email,
        // email_verified: user.email_verified,
        // phone_number: user.phone_number,

        // Custom claims
        role: user.role,
        // userName: user.userName
      })

  if (!xprofile) {
    xprofile = await ProfileModel
      .create(
        {
          uid: user.uid,
          name: user.name,
          photoURL: user.photoURL,
          email: user.email,
          email_verified: user.email_verified,
          phone_number: user.phone_number,

          // Custom claims
          role: user.role,
          userName: user.userName,
        })
  }

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
 * @param userId
 * @param options
 */
async function set (
  userId: string,
  options?: {
    role: string,
    userName: string
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
