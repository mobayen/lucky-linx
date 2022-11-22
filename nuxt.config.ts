// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      link: [
        // TODO: it's more customizavle to move the file to the /assets dir
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
      autoprefixer: {},
    },
  },

})
