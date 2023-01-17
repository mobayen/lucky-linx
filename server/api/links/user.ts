import { db } from '~/server/lib/firebase'
import Link from '~~/models/Link'
import { massageMetadataAfterFetch } from '~~/server/lib/docMetadataHelper'
import ILink from '~~/types/ILink'

// TODO: do we need tomove all control variables to a single file/dir??
const MAX_DOC_COUNT = 12

export default defineEventHandler(async (event) => {
  const params = getQuery(event)
  const { limit, userName } = params

  // TODO: check if a user is logged in
  // TODO... if not, return unauthorized-access

  // make sure we dont pass only a Number
  let limitQ = Math.floor(Number(limit))
  if (isNaN(limitQ) || limitQ > MAX_DOC_COUNT) {
    limitQ = MAX_DOC_COUNT
  }

  const links: ILink[] = []
  // let briefUser: IUser = new User()
  let briefUser = null

  // first find the user
  await db.collection('profiles')
    .where('userName', '==', userName)
    .limit(1)
    .get()
    .then((docs) => {
      // TODO: throw an error if no user found
      // if (docs.empty) {
      // }

      docs.forEach((doc) => {
        const temp = doc.data()
        // Be careful not to share sensitive information
        // It willbe visible on a public page
        briefUser = {
          name: temp.name,
          userName: temp.userName,
          photoURL: temp.photoURL,
          about: temp.about,
        }
      })
    }).catch((err) => {
      console.log('x12 error', err)
    })

  // TODO: if the user has not found, throw a "user does not exist" error
  // TODO...

  await db.collection('links')
    .where('metadata.createdBy.userName', '==', userName)
    .limit(limitQ)
    .orderBy('metadata.createdAt', 'desc')
    .get()
    .then((data) => {
      data.docs.forEach((doc) => {
        const data = doc.data()

        const newLink = new Link({
          uid: doc.id,
          title: data.title,
          url: data.url,
          note: data.note,
          tags: data.tags,

          metadata: massageMetadataAfterFetch(data.metadata),
        })

        links.push(newLink)
      })
    }).catch((error) => {
      console.log('x7 error', error)
    })

  // throw createError({
  //   statusCode: 401,
  //   message: 'custom error message'
  // })

  return {
    data: {
      links,
      user: briefUser,
    },
  }
})
