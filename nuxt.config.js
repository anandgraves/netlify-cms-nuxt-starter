const vfile = require('to-vfile')
const matter = require('vfile-matter')
const frontmatter = vfile.readSync('./src/client/content/homepage.md')
const settingsData = require('./src/client/static/settings.json')
const { favicon } = settingsData
matter(frontmatter)

const {
  data: {
    matter: { sitetitle, file: filesrc, searchenginedescription }
  }
} = frontmatter

export default {
  target: 'static',
  srcDir: 'src/client',
  /*
   ** https://github.com/nuxt/components
   */
  components: true,
  generate: {
    fallback: true
  },
  pwa: {
    icon: {
      source: `src/client/static${favicon}`
    },
    meta: {
      description: searchenginedescription,
      ogHost: process.env.NETLIFY_URL,
      ogImage: filesrc
    },
    manifest: {
      name: sitetitle
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
    // Doc: https://content.nuxtjs.org/installation
    '@nuxt/content'
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  }
}
