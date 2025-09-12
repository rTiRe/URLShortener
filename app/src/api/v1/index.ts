import { Router } from 'express'

import urlsRouter from './urls'

const router = Router()
router.use('/urls', urlsRouter)

export default router