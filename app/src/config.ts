import dotenv from 'dotenv'

dotenv.config({quiet: true})

export default class Config {
  static get APP_HOST(): string {
    return process.env.APP_HOST || '0.0.0.0'
  }

  static get APP_PORT(): number {
    return Number(process.env.APP_PORT) || 5000
  }

  static get LOG_LEVEL(): string {
    return process.env.LOG_LEVEL || 'error'
  }

  static get DB_URL(): string {
    const dbUrl = process.env.DB_URL
    if (!dbUrl) {
      throw new Error('DB_URL is not set in environment variables')
    }
    return dbUrl
  }

  static get SLOT(): number {
    return Number(process.env.SLOT) || 1
  }

  static get AUTHENTIK_EXTERNAL_HOST(): string {
    return process.env.AUTHENTIK_EXTERNAL_HOST || '127.0.0.1'
  }

  static get AUTHENTIK_EXTERNAL_PORT(): number {
    return Number(process.env.AUTHENTIK_EXTERNAL_PORT) || 9000
  }

  static get AUTHENTIK_EXTERNAL_URL(): string {
    return `http://${this.AUTHENTIK_EXTERNAL_HOST}:${this.AUTHENTIK_EXTERNAL_PORT}/`
  }

  static get OAUTH2_CLIENT_ID(): string {
    return process.env.OAUTH2_CLIENT_ID || ''
  }

  static get OAUTH2_CLIENT_SECRET(): string {
    return process.env.OAUTH2_CLIENT_SECRET || ''
  }
}
