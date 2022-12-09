import { FirebaseError } from 'firebase/app'
import {
  getAuth, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  User, updateProfile
} from 'firebase/auth'
import { defineStore } from 'pinia'
import UserModel from '~~/models/User'
import IUser from '~~/types/IUser'

export const useAuth = defineStore('auth', {
  state: () => {
    return {
      user: null as IUser | null,
      error: null as FirebaseError | null
    }
  },

  getters: {
    isLoggedIn (): boolean {
      return !!this.user?.uid
    },

    hasError (): boolean {
      return !!this.error?.message
    }
  },

  actions: {
    /**
     * extracts required user's properties
     *
     * @param user Firebase Auth User
     */
    async extractUserDetail (user: User | null) {
      const userCookie = useCookie('__session')

      // TODO: check to make sure the cookie is empty

      if (!user) {
        this.user = null
        return
      }

      const idTokenResult = await user.getIdTokenResult(true)

      userCookie.value = JSON.stringify({ idToken: idTokenResult.token })

      this.user = new UserModel({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        email_verified: user.emailVerified,
        phone_number: user.phoneNumber,
        photoURL: user.photoURL,
        // costum claims
        role: idTokenResult.claims.role ?? ''
      })
    },

    initUser () {
      const auth = getAuth()

      // extract props as needed
      // this.extractUserDetail(auth.currentUser)

      onAuthStateChanged(auth, (xuser) => {
        this.extractUserDetail(xuser)
      })
    },

    /**
     * create user with email and password
     * and set the name if present
     *
     * @param email
     * @param password
     * @param name
     */
    async createUser (email: string, password: string, name?: string) {
      const auth = getAuth()

      // TODO: redirect if registered successfully

      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          this.updateProfile({
            name
          })
        })
        .catch((error) => {
          this.error = error
        })
    },

    /**
     *
     * @param email
     * @param password
     */
    async signInUser (email: string, password: string) {
      const auth = getAuth()

      // TODO: redirect if signed in successfully

      await signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
          this.error = error
        })
    },

    /**
     * Sign out the current user
     */
    async signOut () {
      const auth = getAuth()
      await auth.signOut()

      // TODO: redirect to home page if the user was in a password-protected page
      // TODO... if it;s already a public page dont need to redirect
    },

    async updateProfile (options: {name?: string, photoURL?: string}): Promise<{ res: any}> {
      const auth = getAuth()

      const response = {
        res: ''
      }

      // TODO: create an IResponse type to be returned by some methods
      // TODO... methods that request something from an external API

      if (!auth.currentUser) {
        response.res = 'No user found'

        return response
      }

      // TODO: do not pass a value if it does not exist in options
      // TODO... so it wont change if it already has a value

      await updateProfile(auth.currentUser, {
        displayName: options?.name ?? '',
        photoURL: options.photoURL ?? ''
      }).then(() => {
        response.res = 'Success'
      }).catch((err) => {
        response.res = 'ERROR: ' + err.message
      })

      return response
    }
  }
})
