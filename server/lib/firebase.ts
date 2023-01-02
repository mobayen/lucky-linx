import { cert, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// TODO: Do I need to check apps.length ??
// const apps = getApps()

const config = useRuntimeConfig()

const app = initializeApp({
  credential: cert({
    projectId: config.firebaseConfig.projectId,
    clientEmail: config.firebaseConfig.clientEmail,
    privateKey: config.firebaseConfig.privateKey
      ? config.firebaseConfig.privateKey.replace(/\\n/gm, '\n')
      : undefined,

  }),
  databaseURL: config.public.firebaseConfig.databaseUrl,
})

const auth = getAuth(app)

export { app, auth }
