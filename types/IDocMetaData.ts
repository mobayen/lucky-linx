import { Timestamp } from 'firebase-admin/firestore'

interface DocMetadata {
  createdAt?: Timestamp,
  createdAtDate?: Date,
  createdBy: {
    uid: string,
    name: string,
    photoURL: string,
  }
}

export default DocMetadata
