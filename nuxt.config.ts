// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      title: process.env.APP_TITLE ?? 'LuckyLinx',
      meta: [
        { name: 'description', content: 'Easily share links & notes with a community. Discover new content & get feedback.' },
        { name: 'keywords', content: 'link sharing, link discovery, personal notes, content discovery, community sharing' },
      ],
      link: [
        // TODO: Use an uploaded file as favicon
        // TODO... It needs to points to ~/assets/img/... or firebase-storage giles

        { rel: 'icon', type: 'image/png', href: '/ll-ico.png' },
      ],
    },
  },

  modules: [
    '@pinia/nuxt',
  ],

  css: [
    '~/assets/css/main.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      nodeENV: process.env.NODE_ENV,
      appTitle: process.env.APP_TITLE,
      rootUrl: (process.env.NODE_ENV === 'production')
        ? process.env.ROOT_URL_PROD
        : process.env.ROOT_URL_DEV,
      firebaseConfig: {
        apiKey: process.env.FIREBASE_CONFIG_API_KEY,
        authDomain: process.env.FIREBASE_CONFIG_AUTH_DOMAIN,
        databaseUrl: process.env.FIREBASE_CONFIG_DATABASE_URL,
        projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
        storageBucket: process.env.FIREBASE_CONFIG_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_CONFIG_APP_ID,
        measurementId: process.env.FIREBASE_CONFIG_MEASUREMENT_ID,
      },
    },

    /// PRIVATE ///
    firebaseConfig: {
      projectId: process.env.FIREBASE_CONFIG_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CONFIG_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_CONFIG_PRIVATE_KEY,
    },
  },
})
