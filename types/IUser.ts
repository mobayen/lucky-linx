interface IUser {
  uid: string
  name: string | null
  photoURL: string | null
  email: string | null
  email_verified: boolean
  phone_number: string | null

  // Custom claims
  role: string | null
  // role?: string | null

  userName: string | null

  about?: string | null
}

export default IUser
