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

  modules: [],

  css: [
    '~/assets/css/main.css'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
