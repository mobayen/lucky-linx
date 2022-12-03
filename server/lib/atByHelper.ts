import { H3Event } from 'h3'
import { FieldValue } from 'firebase-admin/firestore'

/**
 * Gathers all information on who and when did what!
 * To be included in every document in DB
 *
 * @param event
 * @returns { createdAt, createdBy }
 */
function getAtBy (event: H3Event) {
  const { context } = event
  const { user } = context

  return {
    createdAt: FieldValue.serverTimestamp(),
    createdBy: {
      uid: user.uid,
      name: user.name,
      picture: user.picture
    }
  }
}

export {
  getAtBy
}
