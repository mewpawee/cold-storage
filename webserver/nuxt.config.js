const colors = require('vuetify/es5/util/colors').default
const userRequest = {
  query: `{
   user{
     _id
     username
     role
   }
 }`,
}

module.exports = {
  serverMiddleware: [
    {
      path: 'graphql',
      handler: '~/api/graphql.js',
    },
    {
      path: 'tools',
      handler: '~/api/tools.js',
    },
  ],
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/myplugin.client.js' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/apollo',
    'nuxt-leaflet',
    [
      'nuxt-gmaps',
      {
        key: process.env.GOOGLEAPI,
      },
    ],
  ],
  router: {
    middleware: ['auth'],
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: `/graphql`,
        httpLinkOptions: {
          credentials: 'same-origin',
        },
      },
    },
  },
  auth: {
    redirect: {
      login: '/',
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `/`,
            method: 'post',
            propertyName: 'data.login.token',
          },
          logout: false,
          user: {
            url: `/`,
            method: 'post',
            data: userRequest,
            propertyName: 'data.user',
          },
        },
        tokenName: 'token',
        autoFetchUser: true,
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: '/graphql',
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      cold: true,
      themes: {
        cold: {
          primary: colors.blueGrey.lighten2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },
  },
  publicRuntimeConfig: {
    host: process.env.HOST,
    googleAPI: process.env.GOOGLEAPI
  },
}
