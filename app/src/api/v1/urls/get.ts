import { Router, Request, Response } from 'express'

import postgres from '../../../storages/PostgresStorage'

const router = Router()

router.get('/:shortCode', async (request: Request, response: Response) => {
  const queryResult = await postgres.pool.query(
    'select original_url from shortener.urls where short_code = $1',
    [
      request.params.shortCode,
    ],
  )
  response.json(queryResult.rows[0])
})

export default router
