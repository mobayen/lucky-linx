import { FirebaseError } from 'firebase/app'
import {
  getAuth, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  User, updateProfile
} from 'firebase/auth'
import { defineStore } from 'pinia'

interface myUser {
  uid: string,
  name: string | null,
  email: string | null,
  emailVerified: boolean,
  phoneNumber: string | null,
  photoURL: string | null,
  // costum claims
  role?: string | null
}

export const useAuth = defineStore('auth', {
  state: () => {
    return {
      user: null as myUser | null,
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

      const idTokenResult = await user.getIdTokenResult()

      userCookie.value = JSON.stringify({ idToken: idTokenResult.token })

      this.user = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        // costum claims
        role: idTokenResult.claims.role ?? 'default'
      }
    },

    initUser () {
      const auth = getAuth()

      // extract props as needed
      this.extractUserDetail(auth.currentUser)

      // TODO: cookie
      // const userCookie = useCookie('__session')

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
    },

    updateProfile (options: {name?: string, photoURL?: string}) {
      const auth = getAuth()

      if (!auth.currentUser) {
        return
      }

      // TODO: do not pass a value if it does not exist in options
      // TODO... so it wont change if it already has a value

      updateProfile(auth.currentUser, {
        displayName: options?.name ?? '',
        photoURL: options.photoURL ?? ''
      })
    }
  }
})
