import Project from '../models/project.js'
import mongoose from 'mongoose'
import {authRole} from '../middleware/auth.js'
import { canViewProject, scopedProject } from '../middleware/permissions.js'
import { NextWeek } from '@material-ui/icons'

export const getProjects = async (req,res) =>{
  
  if (!req.userId) return res.json({message: 'You need to sign in'})
  try{
    const projects = await Project.find({userId: req.userId})
    res.status(200).json(projects)
  }
  catch(error){
    res.status(404).json({message: error.message})
  }
}

export const createProject = async (req, res)=>{
  if (!req.userId) return res.json({message: 'You need to sign in'})
  const project = req.body
  const newProject = new Project(project)
  try{
    await newProject.save()
    res.status(201).json(newProject)
  }
  catch (error){
    res.status(409).json({message: error.message})
  }
}

export const getProjectById = async (req,res) =>{

  if (!req.userId) return res.json({message: 'You need to sign in'})
  
  try {
    const project  = await Project.find({_id: req.params.id})
    if (!canViewProject(req.userId, project)) return res.status(401).send('Not Allowed')
    res.status(201).json(project) 
  } catch (error) {
      res.status(404).json({message: error.message})
  }
}
export const deleteProject = async( req, res) =>{
  try {
    const project = Project.find({_id: req.params.id})
    // if (req.userId!== project.userId) return res.status(401).send(req.userId)
    await Project.findByIdAndDelete({_id: req.params.id})
    res.status(201).json('deleted')
  } catch (error) {
    res.status(404).json({message: error.message})
  }
}
