import express from 'express'

import { createList, getLists, moveTasks, updateList} from '../controllers/lists.js'
import {auth} from '../middleware/auth.js'
const router = express.Router()


router.get('/', auth, getLists)
router.post('/', auth, createList)
router.post('/:id', auth, updateList)
router.put('/move/:id', auth,moveTasks)
export default router