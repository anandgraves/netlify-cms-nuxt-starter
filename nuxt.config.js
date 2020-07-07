const vfile = require('to-vfile')
const matter = require('vfile-matter')

const frontmatter = vfile.readSync('./src/client/content/homepage.md')
matter(frontmatter)

console.log('env var', process.env.NETLIFY_URL)
console.log('FILE', frontmatter)

const {
  data: {
    matter: { sitetitle, file: filesrc, searchenginedescription }
  }
} = frontmatter
const ogImage = `${process.env.NETLIFY_URL}${filesrc}`
console.log(sitetitle, filesrc, searchenginedescription, ogImage)

export default {
  mode: 'universal',
  /*
   ** https://github.com/nuxt/components
   */
  components: true,
  // server: {
  //   port: '8000',
  //   host: '0.0.0.0'
  // },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },
  srcDir: 'src/client',
  generate: {},
  pwa: {
    meta: {
      name: sitetitle,
      description: searchenginedescription,
      ogHost: process.env.NETLIFY_URL,
      ogImage: {
        path: filesrc
      }
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['./src/client/components/app-core/index.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/pwa-module
    '@nuxtjs/pwa'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://content.nuxtjs.org/installation
    '@nuxt/content'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  }
}
