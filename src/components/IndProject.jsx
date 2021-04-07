
import React, { useState, useEffect } from 'react'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useDispatch } from 'react-redux'
import { getProjectTasks } from '../actions/tasks'
import { deleteProject } from '../actions/projects';
import {motion} from 'framer-motion'
import pencil from '../img/pencil.png'

export const IndProject = ({setActive, project, currentId, setCurrentId}) =>{

  const [showConfirm, setShowConfirm] = useState(false)
  const dispatch = useDispatch()

  // const selectProjectTasks = (id) =>{
  //   dispatch(getProjectTasks(id))
  // }

  const toDeleteProject = (id) =>{
    dispatch(deleteProject(id))
  }
  useEffect (()=>{
    dispatch(getProjectTasks(currentId))
  },[currentId])
  const [offsetY, setOffsetY] = useState(0)
  const handleScroll = () =>{
    setOffsetY(window.pageYOffset)
  }
  useEffect (()=>{
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  },[])
  return (
    <motion.div
     animate ={{opacity: 1, y: 0}} initial = {{ opacity: 0, y:-100}}
     transition={{ ease: "easeOut", duration: .6 }}
     whileHover={{ y: -15, x: 15}}
      className = 'ind__project' onClick = {()=>{setCurrentId(project._id); setActive(null)}} style={{borderColor: project.color}}>
         <img className = 'pencil' src = {pencil} width = '40' height = '40' alt='img'></img>
    <span>
    <FiberManualRecordIcon className = 'sidebar__project-dot' style = {{color: project.color}}/></span>
      <span  className='sidebar__project-name'>{project.title}</span>
      <span className='sidebar__project-delete' data-testid='delete-project' >
        
        {showConfirm && (
          <div className= 'project-delete-modal'>
            <div className = 'project-delete-modal__inner'>
              <p>Are you sure?</p>
              <button type = 'button' onClick={()=>toDeleteProject(project._id)}>Delete </button>
              <span onClick={()=> setShowConfirm(!showConfirm)}>Cancel</span>
            </div>
          </div>
        )}
      </span>
    </motion.div>
  )
}
