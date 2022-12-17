import { Timestamp } from 'firebase-admin/firestore'
import IUser from './IUser'

interface DocMetadata {
  createdAt?: Timestamp,
  createdAtDate?: Date,
  createdBy: IUser
}

export default DocMetadata
