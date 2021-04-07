import React, { useEffect, useState } from 'react'
import { Sidebar } from './Sidebar'
import { Tasks } from '../Tasks'
import { BoardTasks } from '../BoardTasks'
import { Projects } from '../Projects'



export const Content = ({currentId, setCurrentId, active, setActive, userId}) => {

  return (
    <section className = 'content'>
      <Projects  active= {active} setActive={setActive} currentId = {currentId} setCurrentId ={setCurrentId} />
      {
        active || currentId ? <Tasks userId = {userId} active={active}  currentId = {currentId}/> : null
      }
       
    </section>
  )
}
