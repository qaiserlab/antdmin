export default function EnvyConfig() {
  return {
    NODE_ENV: String(process.env.NODE_ENV),
    APP_NAME: String(process.env.APP_NAME),
    APP_VERSION: String(process.env.APP_VERSION),
    APP_PORT: Number(process.env.APP_PORT),
    APP_HOST: Number(process.env.APP_HOST),
    API_HOST: String(process.env.API_HOST),
    API_KEY: String(process.env.API_KEY),
  }
}