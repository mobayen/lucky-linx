import { H3Event } from 'h3'
import { FieldValue } from 'firebase-admin/firestore'

/**
 * Extracts all information on "who" and "when" did "what"!
 * To be included in every document in DB
 *
 * event.context.user is required
 * It gets populated in the auth middleware
 *
 * @param event
 * @returns { createdAt, createdBy }
 */
function getDocMetadata (event: H3Event) {
  // NOTE: auth middleware populates the user
  const user = event?.context?.user ?? undefined

  return {
    createdAt: FieldValue.serverTimestamp(),
    createdBy: {
      uid: user.uid,
      name: user.name,
      photoURL: user.photoURL
    }
  }
}

export {
  getDocMetadata
}
