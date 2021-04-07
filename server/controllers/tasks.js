import Task from '../models/task.js'
import mongoose from 'mongoose'
import moment from 'moment'

export const getTasks = async (req, res)=>{
    try{
        const tasks = await Task.find({userId : req.userId})
        console.log(tasks)
        res.status(200).json(tasks)
    }
    catch (error){
        res.status(404).json({message: error.message})
    }
}

export const createTask = async (req, res) =>{
    const task = req.body
    const newTask = new Task(task)
    try{
        
        await newTask.save()
        res.status(201).json(newTask)
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}


export const getTask = async (req, res) =>{
    try{
        const task = await Task.findById(req.params.id)
        console.log(task)
        res.status(201).json(task)
    }
    catch (error){
        res.status(404).json({message: error.message})
    }
}

export const deleteTask = async (req, res)=>{
    try{
        await Task.findByIdAndDelete(req.params.id)
        res.status(201).json('Deleted')
    }

    catch (error){
        res.status(404).json({message: error.message})
    }
}

export const completeTask =async (req,res) =>{
    try {
        const task = await Task.findById(req.params.id)
        task.completed = !task.completed
        await task.save()
        res.status(201).json(task)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
// 603b947a46795c17fc7ab760

export const projectTasks = async(req,res) =>{
    try {
        const id = req.params.id
        const task = await Task.find({project: `${id}`})
        res.status(201).json(task)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getTodayTasks = async(req, res) =>{
    try {
        const task = await Task.find({ date : `today`, userId: req.userId})
         res.status(201).json(task)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export const getNextDaysTasks = async(req, res) =>{
    try {
        const task = await Task.find({ date : `next days`, userId: req.userId})
         res.status(201).json(task)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}