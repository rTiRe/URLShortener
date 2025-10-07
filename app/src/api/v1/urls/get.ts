import { Router, Request, Response } from 'express'

import postgres from '../../../storages/PostgresStorage'
import logger from '../../../logger'

const router = Router()


/**
 * @openapi
 * /urls/{shortCode}:
 *   get:
 *    tags:
 *      - URLs
 *    summary: Get full URL by short code.
 *    parameters:
 *      - name: shortCode
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Successfull response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/OriginalURL'
 *      '404':
 *        description: URL not found
 */
router.get('/:shortCode', async (request: Request, response: Response) => {
  const queryResult = await postgres.pool.query(
    'select original_url from shortener.urls where short_code = $1',
    [
      request.params.shortCode,
    ],
  )
  const originalURL = queryResult.rows[0]?.original_url
  if (!originalURL) {
    response.status(404)
    response.end()
    return
  }
  // Доверяем, потому что этот header ставит nginx 
  // после того как Authentik проверил по куки, 
  // что пользователь авторизован
  logger.info(request.headers['x-authentik-uid'])
  response.json(queryResult.rows[0])
})

export default router
