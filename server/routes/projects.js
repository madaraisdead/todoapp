import express from 'express'
import { getProjects, createProject, getProjectById, deleteProject } from '../controllers/projects.js'
import {auth, authRole} from '../middleware/auth.js'

const router = express.Router()

router.get('/:id', auth, getProjectById)
router.get('/', auth, getProjects)
router.post('/', auth, createProject)
router.delete('/:id', auth, deleteProject)


export default router
