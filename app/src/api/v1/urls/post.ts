import { Router, Request, Response } from 'express'
import postgres from '../../../storages/PostgresStorage'
import { shortinizeURLRequest } from '../../../schemas/shortinizeURL/Request'
import shortener from '../../../URLShortener'
import config from '../../../config'

const router = Router()

router.post('/', async (request: Request, response: Response): Promise<void> => {
  try {
    const request_body: shortinizeURLRequest = request.body
    const timestamp_milliseconds = Date.now()
    const timestamp_seconds = Math.round(timestamp_milliseconds / 1000)
    const short_code = shortener.encode([timestamp_seconds, config.SLOT])
    await postgres.pool.query(
      'insert into shortener.urls (id, node, short_code, original_url) values ($1, $2, $3, $4)',
      [
        timestamp_seconds,
        config.SLOT,
        short_code,
        request_body.url,
      ]
    )
    response.json({
      short_code: short_code,
    })
  } catch {
    response.status(422)
    response.end()
  }
})

export default router
