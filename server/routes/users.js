import express from 'express'
import { getUserId, getUsername, loggedin, logout, signin, signup } from '../controllers/users.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/logout', logout)
router.get('/loggedin', loggedin)
router.get('/userId', auth, getUserId)
router.get('/username', auth, getUsername)
export default router