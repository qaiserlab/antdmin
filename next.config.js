const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_CODE: process.env.APP_CODE,
    APP_VERSION: process.env.APP_VERSION,
    APP_PORT: process.env.APP_PORT,
    HOSTNAME: process.env.HOSTNAME,
    HOST: process.env.HOST,
    API_HOSTNAME: process.env.API_HOSTNAME,
    API_PORT: process.env.API_PORT,
    API_HOST: process.env.API_HOST,
  },
}