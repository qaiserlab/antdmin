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
    APP_HOST: process.env.APP_HOST,
    MOCK_HOST: process.env.MOCK_HOST,
    API_HOST: process.env.API_HOST,
  },
}