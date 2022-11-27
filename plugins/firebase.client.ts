import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { useAuth } from '~/stores/authStore'

export default defineNuxtPlugin((_nuxtApp) => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.firebaseConfig.apiKey,
    authDomain: config.public.firebaseConfig.authDomain,
    databaseUrl: config.public.firebaseConfig.databaseUrl,
    projectId: config.public.firebaseConfig.projectId,
    storageBucket: config.public.firebaseConfig.storageBucket,
    messagingSenderId: config.public.firebaseConfig.messagingSenderId,
    appId: config.public.firebaseConfig.appId,
    measurementId: config.public.firebaseConfig.measurementId
  }

  const app = initializeApp(firebaseConfig)

  // TODO: init user
  useAuth().initUser()

  const auth = getAuth(app)

  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
  }
})
