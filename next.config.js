const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    API_HOSTNAME: process.env.API_HOSTNAME,
    API_PORT: process.env.API_PORT,
    API_HOST: process.env.API_HOST,
  },
}