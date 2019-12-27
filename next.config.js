const path = require('path')
const withCSS = require('@zeit/next-css')

function removeMinimizeOptionFromCssLoaders (config) {
  console.warn(
    'HACK: Removing `minimize` option from `css-loader` entries in Webpack config'
  )
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === 'css-loader' && u.options) {
          delete u.options.minimize
        }
      })
    }
  })
}
module.exports = withCSS({
  target: 'serverless',
  env: {
    ROOT_URL: process.env.ROOT_URL
  },
  webpack: (config, { isServer }) => {
    removeMinimizeOptionFromCssLoaders(config)

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(__dirname, 'components/'),
      lib: path.resolve(__dirname, 'lib/'),
      pages: path.resolve(__dirname, 'pages/')
    }
    config.resolve.modules = [
      ...(config.resolve.modules || []),
      path.resolve(__dirname, 'node_modules'),
      'node_modules'
    ]

    return config
  }
})
