import { db } from '~~/server/lib/firebase'

export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  const { uid } = params

  let userObj = null
  let errorx = null

  // TODO: Make sure users pull their own profile info from DB???
  // TODO... is there a good reason not to?

  // it should not pull more than one profile doc (for now)
  await db.collection('profiles')
    .where('uid', '==', uid)
    .limit(1)
    .get()
    .then((docs) => {
      // TODO: throw an error if docs.empty was true

      docs.forEach((doc) => {
        userObj = {
          uid: doc.id,
          ...doc.data(),
        }
      })
    }).catch((error) => {
      console.log('x8 error', error)
      errorx = error.message

      // TODO: throw an error
    })

  return {
    data: {
      user: userObj,
    },
    error: errorx,
  }
})
