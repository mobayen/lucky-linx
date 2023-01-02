import IUser from '~~/types/IUser'

interface ILink {
  _id?: string

  title: string
  url: string
  note?: string,

  createdBy?: IUser
  createdAt?: Date
}

export default ILink
