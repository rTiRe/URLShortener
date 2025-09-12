import { Router } from 'express'

import getRouter from './get'
import postRouter from './post'

const router = Router()
router.use(
  '/',
  getRouter,
  postRouter,
)

export default router