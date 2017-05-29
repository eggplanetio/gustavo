import express from 'express'
import contentApi from './content'
const router = express.Router()

router.use(contentApi)

export default router
