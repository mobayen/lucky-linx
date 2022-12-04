import IUser from '~~/types/IUser'

class User implements IUser {
  public uid = ''
  // NOTE: on firebase/auth it is known as display_name
  public name: string | null = null
  public photoURL: string | null = null
  public email: string | null = null
  public email_verified = false
  public phone_number: string | null = null

  // TODO: role -> roles
  // TODO... an array of roles
  // costume claims
  public role: string | null = ''

  constructor (user?: IUser) {
    // if user was undefined, keep the empty default values
    if (!user) {
      return
    }

    this.uid = user.uid
    this.name = user.name
    this.photoURL = user.photoURL
    this.email = user.email
    this.email_verified = user.email_verified
    this.role = user.role
    this.phone_number = user.phone_number
  }
}

export default User
