import express, { Application } from 'express'

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
