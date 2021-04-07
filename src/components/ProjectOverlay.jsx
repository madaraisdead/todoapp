import React from 'react'
import { useSelector } from 'react-redux'
import {motion} from 'framer-motion'

export const ProjectOverlay = ({setProject, showProjectOverlay, setShowProjectOverlay }) => {

  const projects = useSelector((state)=> state.projects)

  return(
    projects && showProjectOverlay && (
      <motion.div initial={{y : -100, opacity: 0}} animate={{ y: 0, opacity: 1 }} transition={{duration: .5}} className = 'project-overlay'>
        <ul className = 'project-overlay__list'>
          {projects.map(
            project =>(
              <li key = {project._id} onClick = {()=>{setProject(project._id); setShowProjectOverlay(false)}}>{project.title}</li>
            )
          )}
        </ul>
      </motion.div>
    )
  )
}
