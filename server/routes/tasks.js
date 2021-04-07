import express from 'express'
import { getTasks , createTask, getTask, deleteTask, completeTask, projectTasks, getTodayTasks, getNextDaysTasks } from '../controllers/tasks.js'
import {auth} from '../middleware/auth.js'

const router = express.Router()

router.get('/today', auth, getTodayTasks)
router.get('/nextDays', auth, getNextDaysTasks)
router.get('/',auth, getTasks)
router.post('/',auth, createTask)
router.get('/:id',auth, getTask)
router.delete('/:id',auth, deleteTask)
router.post('/:id/complete',auth,completeTask )
router.get('/project/:id',auth, projectTasks)


export default router