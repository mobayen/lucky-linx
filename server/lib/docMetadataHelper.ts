import { H3Event } from 'h3'
import { FieldValue } from 'firebase-admin/firestore'
import IDocMetaData from '~/types/IDocMetaData'

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
function prepareDocMetadataBeforeWrite (event: H3Event) {
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

/**
 * It massages and prepares the metadata object after the documents fetched
 *
 * @param metadata object
 * @returns metadata object ready to be used
 */
function massageMetadataAfterFetch (metadata: IDocMetaData): IDocMetaData {
  metadata.createdAtDate = metadata.createdAt?.toDate()

  return metadata
}

export {
  prepareDocMetadataBeforeWrite,
  massageMetadataAfterFetch
}
