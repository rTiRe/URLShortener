import express, { Application } from 'express'

class App {
  protected _host: string
  protected _port: number
  private _app: Application

  constructor(
    host: string = process.env.APP_HOST || '0.0.0.0',
    port: number = Number(process.env.APP_PORT) || 5000,
  ) {
    this._host = host
    this._port = port
    this._app = express()
    this._app.use(express.json())
  }

  get instance() {
    return this._app
  }

  get host() {
    return this._host
  }

  get port() {
    return this._port
  }

  run() {
    this._app.listen(this._port, this.host, () =>{
      console.log(`App running on ${this._host}:${this._port}`)
    })
  }
}

export default App
