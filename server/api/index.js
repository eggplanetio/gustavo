import express from 'express'
import { links, page, post, posts } from './content'
import apicache from 'apicache'

const router = express.Router()

const gustavoConfig = require(process.cwd() + '/gustavo.config')
const cacheDuration = gustavoConfig.cacheDuration || '60 minutes'

router.use(apicache.middleware(cacheDuration))
router.use('/posts/:id', post)
router.use('/posts', posts)
router.use('/pages/:id', page)
router.use('/links', links)

export default router
