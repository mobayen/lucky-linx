import { FieldValue } from 'firebase-admin/firestore'

// TODO: FieldValue type does not work on the client side
interface DocMetadata {
  createdAt: FieldValue,
  createdBy: {
    uid: string,
    name: string,
    photoURL: string,
  }
}

export default DocMetadata
