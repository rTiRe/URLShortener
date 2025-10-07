import { Router, Request, Response } from 'express'
import postgres from '../../../storages/PostgresStorage'
import { shortinizeURLRequest } from '../../../schemas/shortinizeURL/Request'
import shortener from '../../../URLShortener'
import config from '../../../config'

const router = Router()


/**
 * @openapi
 * /urls:
 *   post:
 *    tags:
 *      - URLs
 *    summary: Shortinize URL
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ShortinizeURLRequest'
 *    responses:
 *      '200':
 *        description: Successfull response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ShortinizeURLResponse'
 *      '422':
 *        description: Unprocessable Entity
 */
router.post('/', async (request: Request, response: Response): Promise<void> => {
  // Доверяем, потому что этот header ставит nginx 
  // после того как Authentik проверил по куки, 
  // что пользователь авторизован
  const user_id = request.header('x-authentik-uid')
  if (!user_id) {
    response.status(401)
    response.end()
    return
  }
  try {
    const request_body: shortinizeURLRequest = request.body
    const timestamp_milliseconds = Date.now()
    const timestamp_seconds = Math.round(timestamp_milliseconds / 1000)
    const short_code = shortener.encode([timestamp_seconds, config.SLOT])
    await postgres.pool.query(
      'insert into shortener.urls (id, node, short_code, original_url, user_id) values (to_timestamp($1), $2, $3, $4, decode($5, \'hex\'))',
      [
        timestamp_seconds,
        config.SLOT,
        short_code,
        request_body.url,
        user_id,
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
