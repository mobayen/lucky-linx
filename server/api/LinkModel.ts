import { Schema, model } from 'mongoose'
import ILink from '~~/types/ILink'

const xSchema = new Schema<ILink>({
  // TODO: make sure "uid or _id" does not store on update
  // uid: String,

  title: { type: String, required: true },
  url: { type: String, required: true },
  note: String,

  createdBy: Object, // type of IUser
}, { timestamps: true })

const LinkModel = model<ILink>('Links', xSchema)

export default LinkModel
