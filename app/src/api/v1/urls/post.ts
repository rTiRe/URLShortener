import { Router, Request, Response } from 'express'

const router = Router()

router.post('/', async (request: Request, response: Response) => {
  try {
    const { original_url } = request.body
    response.json({ original_url })
  } catch {
    response.status(422)
    response.end()
  }
})

export default router
