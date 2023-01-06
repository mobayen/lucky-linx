import { FirebaseError } from 'firebase/app'
import {
  getAuth, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  User, updateProfile,
} from 'firebase/auth'
import { defineStore } from 'pinia'
import UserModel from '~~/models/User'
import IUser from '~~/types/IUser'

// TODO: validate the User
// TODO... before create or update

export const useAuth = defineStore('auth', {
  state: () => {
    return {
      user: null as IUser | null,
      error: null as Error | FirebaseError | null,
    }
  },

  getters: {
    isLoggedIn (): boolean {
      return !!this.user?.uid
    },

    hasError (): boolean {
      return !!this.error?.message
    },
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

      // Pull the user info from DB
      await $fetch('/api/users/find', {
        params: {
          uid: user?.uid,
        },
      }).then((res) => {
        if (res.data.user) {
          const theUser: IUser = res.data.user
          this.user = new UserModel(theUser)
        }
      }).catch((err) => {
        console.log('x9 err', err)
      })

      // make sure user info from DB matches the Auth
      if (
        user.uid !== this.user?.uid ||
        (user.displayName ?? '') !== this.user?.name ||
        (user.email ?? '') !== this.user?.email ||
        user.emailVerified !== this.user?.email_verified ||
        (user.phoneNumber ?? '') !== this.user.phone_number ||
        (user.photoURL ?? '') !== this.user?.photoURL ||
        (idTokenResult.claims.role ?? '') !== this.user.role ||
        (idTokenResult.claims.userName ?? '') !== this.user.userName
      ) {
        // TODO: display what do not match??

        this.error = new Error('ERROR: user\'s info do not match')
      }
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
          this.updateProfile({ name })
        }).catch((error) => {
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

    async updateProfile (options: {
      name?: string,
      photoURL?: string,
      userName?: string,
      about?: string,
    }): Promise<void> {
      const auth = getAuth()

      // TODO: create an IResponse type to be returned by some methods
      // TODO... methods that request something from an external API

      if (!auth.currentUser) {
        return
      }

      // TODO: do not pass a value if it does not exist in options
      // TODO... so it wont change if it already has a value

      // it updates the auth:profile
      await updateProfile(auth.currentUser, {
        displayName: options?.name ?? '',
        photoURL: options.photoURL ?? '',
      }).then(() => {
        // if auth:updateProfile was successfull then we can create/update the profile doc in DB
        this.updateProfileDbDoc({
          photoURL: options.photoURL,
          name: options.name,
          userName: options.userName,
          about: options.about,
        })

        // TODO: any better solution to refresh user's info
        // TODO... custom claims specificaly
        // TODO: reload with a warning before for a short period of time
        // force reload to refresh the user info
        location.reload()
      }).catch((err) => {
        console.log('x10 error: ', err)
      })
    },

    async updateProfileDbDoc (options: {
      name?: string,
      photoURL?: string,
      userName?: string,
      about?: string,
    }): Promise<void> {
      // TODO: probably it is better to update profiles collection in  a furebase/function

      // TODO: move it to authStore

      await $fetch('/api/users/write', {
        method: 'POST',
        body: {
          data: {
            photoURL: options.photoURL,
            name: options.name,
            userName: options.userName,
            about: options.about,
          },
        },
      }).catch((e) => {
        console.log('x11 err, ', e)
      })
    },
  },
})
