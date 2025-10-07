import express, { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

import logger from './logger'
import config from './config'
import apiRouter from './api'
import PostgresStorage from './storages/PostgresStorage'

class App {
  protected _host: string
  protected _port: number
  private _app: Application

  constructor(
    host: string = config.APP_HOST,
    port: number = config.APP_PORT,
  ) {
    this._host = host
    this._port = port
    this._app = express()
    this._app.use(express.json())
    this._app.use('/api', apiRouter)
    const swaggerOptions = {
      failOnErrors: true,
      definition: {
        openapi: '3.1.0',
        info: {
          title: 'URL Shortener API',
          version: '1.0.0',
        },
        servers: [
          {
            url: 'http://127.0.0.1/api/v1',
            description: 'Version 1 API',
          },
        ],
        components: {
          schemas: {
            ShortinizeURLRequest: {
              type: 'object',
              properties: {
                url: {
                  type: 'string',
                  example: 'https://example.com/some/path?query=parameter',
                },
              },
            },
            ShortinizeURLResponse: {
              type: 'object',
              properties: {
                short_code: {
                  type: 'string',
                  example: 'aB_1!',
                },
              },
            },
            OriginalURL: {
              type: 'object',
              properties: {
                original_url: {
                  type: 'string',
                  example: 'https://example.com/some/path?query=parameter',
                },
                user_id: {
                  type: 'string',
                  example: '4b42c4ff9f794a436f2817bb1e51dbf33c97be44dfb17e3bd4b608c9d282e380',
                  description: 'SHA256 encoded user id'
                },
              },
            },
          },
        },
      },
      apis: ['**/*.ts'],
    };
    // const swaggerDocument = require('./api/swagger.yml');
    this._app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)))
  }

  get instance(): Application {
    return this._app
  }

  get host(): string {
    return this._host
  }

  get port(): number {
    return this._port
  }

  private async stop_listener() {
    await PostgresStorage.disconnect()
    logger.info('App stopped')
  }

  run() {
    process.once('SIGINT', this.stop_listener)
    process.once('SIGTERM', this.stop_listener)
    this._app.listen(this._port, this.host, async () => {
      await PostgresStorage.connect()
      logger.info(`App running on ${this._host}:${this._port}`)
    })
  }
}

export default App
