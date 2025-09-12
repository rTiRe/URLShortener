import express, { Application } from 'express'

import logger from './logger'
import config from './config'
import apiRouter from './api'

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

  run() {
    this._app.listen(this._port, this.host, () => {
      logger.info(`App running on ${this._host}:${this._port}`)
    })
  }
}

export default App
