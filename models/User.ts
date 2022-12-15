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
    this.phone_number = user.phone_number
    // custom claims
    this.role = user.role
  }

  toJSON (): IUser {
    return {
      uid: this.uid,
      name: this.name,
      photoURL: this.photoURL,
      email: this.email,
      email_verified: this.email_verified,
      phone_number: this.phone_number,
      role: this.role
    }
  }
}

export default User
