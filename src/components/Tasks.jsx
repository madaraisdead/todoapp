import React, { useEffect, useState } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { useTasks } from '../hooks'
import { AddTask } from '../components/AddTask'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { useDispatch, useSelector } from 'react-redux'
import { completeTask, deleteTask } from '../actions/tasks'
import { deleteProject, getProjectById } from '../actions/projects'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import { BoardWrapper } from './BoardWrapper'
import {motion, useMotionValue} from 'framer-motion'
import { DndProvider } from 'react-dnd'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DeleteOutline } from '@material-ui/icons';
toast.configure()
export const Tasks = ({currentId, active, userId}) => {

  // const { selectedProject } = useSelectedProjectValue()
  // const { projects } = useProjectsValue()
  // const { tasks } = useTasks(selectedProject)
  
  const tasks = useSelector( state => state.tasks)
  const project = useSelector ( state => state.projects)
  const correct = () =>{
    toast.success('Task deleted from project', {position: toast.POSITION.BOTTOM_RIGHT})
  }
 

  let projectName = ''
  const dispatch = useDispatch()

  const toCompleteTask = (id) =>{
    dispatch( completeTask(id))
  }
  const toDeleteTask = (id) =>{
    dispatch(deleteTask(id))
    correct()
  }

  useEffect (()=>{
    document.title = `${active? active : getProjectTitle()}: TodoApp`
  })
  
  const getProjectTitle = () => {
    for (let i=0; i<project.length; i++){
      if(project[i]._id === currentId) return(project[i].title);
    }
  }
  const getProjectId = () => {
    for (let i=0; i<project.length; i++){
      if(project[i]._id === currentId) return(project[i]._id);
    }
  }

  const getProjectType = () => {
    for (let i=0; i<project.length; i++){
      if (project[i]._id === currentId) return (project[i].type)
    }
  }
  const [showConfirm, setShowConfirm] = useState(false)
  const [show,setShow] = useState(true)
  const toDeleteProject = (id) =>{
    dispatch(deleteProject(id))
    setShowConfirm(false)
  }
  const scrollX = useMotionValue(0)
  const handleScroll = e => {
  scrollX.set(e.nativeEvent.target.scrollLeft)
}
  return (
    <motion.div onScroll ={ e => handleScroll(e)} initial ={{x: 1000}} animate ={{x:0}} transition= {{duration: 1}} className = 'tasks' data-testid= 'tasks'>

      <motion.h2 style = {{fontWeight: 'bold'}}>{active ? active : getProjectTitle()}</motion.h2>
     <span style ={{cursor: 'pointer'}}><DeleteOutline onClick={()=>setShowConfirm(!showConfirm)}/></span> 
     {showConfirm && (
          <motion.div initial = {{y:-100}} animate= {{y:0}} className= 'project-delete-modal'>
            <div className = 'project-delete-modal__inner'>
              <p>Do you want to delete project '{getProjectTitle()}'?</p>
              <button type = 'button' onClick={()=>toDeleteProject(getProjectId())}>Delete</button>
              <span onClick={()=> setShowConfirm(!showConfirm)}>Cancel</span>
            </div>
          </motion.div>
        )}
      {getProjectType() === 'default' || active ? <AddTask userId = {userId} currentId = {currentId}/> : <></>}
        {getProjectType() ==='default' || active ? tasks.map(task =>(
          <ul className = 'tasks__list'>
          <li key = {task._id} style = {{textDecoration: task.completed ? 'line-through' : 'none'}}>
            <input type = 'hidden' value = {task._id} name = 'id'/>
            <div className='checkbox__holder' data-testid = 'checbox__action' onClick = {()=> toCompleteTask(task._id)} >
            <span className="checkbox"><DoneIcon className= 'checkbox__icon'  fontSize = 'small'/></span>
             </div>
            <PriorityHighIcon style= {{color: task.color}}/>
            <Typography>{task.title}</Typography>
            <span className = 'delete-task'><DeleteIcon onClick = {()=> {toDeleteTask(task._id)}}/></span>
          </li>
          </ul> 
        ))
        :
        (
          <BoardWrapper userId = {userId} currentId ={ currentId } />
        )
      }
    
      
    </motion.div>
  )
}
