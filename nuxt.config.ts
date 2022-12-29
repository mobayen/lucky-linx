// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      link: [
        // TODO: Use an uploaded file as favicon
        // TODO... It needs to points to ~/assets/img/... or firebase-storage giles

        { rel: 'icon', type: 'image/png', href: '/ll-ico.png' }
      ]
    }
  },

  modules: [
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      firebaseConfig: {
        apiKey: process.env.FIREBASE_CONFIG_API_KEY,
        authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
        databaseUrl: process.env.FIREBASE_CONFIG_DATABASE_URL,
        projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
        storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_CONFIG_APP_ID,
        measurementId: process.env.FIREBASE_CONFIG_MEASUREMENT_ID
      }
    },

    /// PRIVATE ///
    firebaseConfig: {
      projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CONFIG_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_CONFIG_PRIVATE_KEY
    },

    mongodbUrl: process.env.MONGODB_URL
  }
})
