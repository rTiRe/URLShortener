import dotenv from 'dotenv'

dotenv.config({quiet: true})

export default class Config {
  static get APP_HOST() {
    return process.env.APP_HOST || '0.0.0.0'
  }

  static get APP_PORT() {
    return Number(process.env.APP_PORT) || 5000
  }

  static get LOG_LEVEL() {
    return process.env.LOG_LEVEL || 'error'
  }
}
