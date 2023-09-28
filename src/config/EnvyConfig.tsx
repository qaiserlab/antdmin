export default function EnvyConfig() {
  return {
    APP_ENV: String(process.env.APP_ENV),
    APP_NAME: String(process.env.APP_NAME),
    APP_VERSION: String(process.env.APP_VERSION),
    APP_PORT: Number(process.env.APP_PORT),
    APP_HOST: String(process.env.APP_HOST),
    API_HOST: String(process.env.API_HOST),
    API_KEY: String(process.env.API_KEY),
    ACCESS_KEY: String(process.env.ACCESS_KEY),
  }
}