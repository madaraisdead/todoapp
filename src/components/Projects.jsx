import React, {useState} from 'react'
import { IndProject } from './IndProject'
import { useSelector } from 'react-redux'

export const Projects = ({active, setActive, currentId, setCurrentId}) =>{
  
  
  const projects = useSelector((state)=> state.projects)
  return(
    <div className = 'projects'>
      {
         projects &&
         projects.map(project=>(
           
                   <li key = {project._id}
            className = {
              active === project._id
              ? 'active sidebar__project'
              : 'sidebar__project'
            }
            onClick = {()=>{
              setActive(null)
            }}
            // onKeyDown = {()=>{
            //   setActive(currentId)
            //   setSelectedProject(currentId)
            // }}
            ><IndProject setActive = {setActive} project ={project} currentId = {currentId} setCurrentId={setCurrentId}/></li>
           
        ))
      }
    </div>
  )
  
}
