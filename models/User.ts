import validator from 'validator'

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
  public userName: string | null = null

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
    this.userName = user.userName
  }

  toJSON (): IUser {
    return {
      uid: this.uid,
      name: this.name,
      photoURL: this.photoURL,
      email: this.email,
      email_verified: this.email_verified,
      phone_number: this.phone_number,
      role: this.role,
      userName: this.userName
    }
  }

  validate () {
    const name =
      validator.isLength(this.name ?? '', { min: 1, max: 64 })

    const userName =
      validator.isLength(this.userName ?? '', { min: 5, max: 64 }) &&
      validator.isAlphanumeric(this.userName ?? '', 'en-US', {
        ignore: '_'
      })

    return {
      name,
      userName,

      _all: name && userName
    }
  }
}

export default User
