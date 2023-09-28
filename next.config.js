const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    APP_ENV: process.env.APP_ENV,
    APP_NAME: process.env.APP_NAME,
    APP_VERSION: process.env.APP_VERSION,
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    API_HOST: process.env.API_HOST,
    API_KEY: process.env.API_KEY,
    ACCESS_KEY: process.env.ACCESS_KEY,
  },
}