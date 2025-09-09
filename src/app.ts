import express, { Application } from 'express'

class App {
  protected _host: string
  protected _port: number
  private _app: Application

  constructor(
    host: string = '127.0.0.1',
    port: number = 3000
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
