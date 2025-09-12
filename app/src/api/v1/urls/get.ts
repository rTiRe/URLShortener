import { Router, Request, Response } from 'express'

const router = Router()

router.get('/', async (request: Request, response: Response) => {
  response.json({ original_url: 'https://original.url/with/route' })
})

export default router
