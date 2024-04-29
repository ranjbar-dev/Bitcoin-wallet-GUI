// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true
  },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  tailwindcss: {
    //
  },

  pinia: {
    // 
  },

  app: {

    head: {
        charset: 'utf-16',
        viewport: 'width=500, initial-scale=1',
        title: "Bitcoin wallet GUI",
    },

  },

  plugins:[
    { src: '~/plugins/api/index.js', mode: 'client' },
  ],

  routeRules:{
    '/blockstream/**': { proxy: process.env.BLOCKSTREAM_HOST + '/**' },
    '/binance/**': { proxy: process.env.BINANCE_HOST + '/**' },
    '/trezor/**': { proxy: process.env.TREZOR_HOST + '/**' },
  },

})