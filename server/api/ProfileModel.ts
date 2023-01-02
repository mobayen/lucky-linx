import { Schema, model } from 'mongoose'
import IUser from '~~/types/IUser'

const xSchema = new Schema<IUser>({
  uid: String,
  name: { type: String, default: null },
  photoURL: { type: String, default: null },
  email: { type: String, default: null },
  email_verified: { type: Boolean, default: false },
  phone_number: { type: String, default: null },

  // Custom claims
  role: { type: String, default: null },
  // role?: string | null
  userName: { type: String, default: null },

}, { timestamps: true })

const ProfileModel = model<IUser>('profiles', xSchema)

export default ProfileModel
