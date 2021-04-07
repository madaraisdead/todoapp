import React, {useState} from 'react'
import InboxIcon from '@material-ui/icons/Inbox';
import TodayIcon from '@material-ui/icons/Today';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton } from '@material-ui/core';
import { Projects } from '../Projects'
import { AddProject } from '../AddProject'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useDispatch } from 'react-redux'
import { getNextDaysTasks, getTasks, getTodayTasks } from '../../actions/tasks'
import axios from 'axios';
import { ExitToApp, LiveHelp } from '@material-ui/icons';

export const Sidebar = ({ userId, currentId, setCurrentId, active, setActive}) => {
  const dispatch = useDispatch()
  const [showProjects, setShowProjects]= useState(true)
  
  const getInbox = () =>{
    dispatch(getTasks())
  }
  const getToday = () =>{
    dispatch(getTodayTasks())
  }
  const getNext = () =>{
    dispatch(getNextDaysTasks())
  }
  async function logout(){
    await axios.get('http://localhost:5000/users/logout')
    window.location = '/'
  }
  const goToHelp = () =>{window.location = '/help'}
  return (
    <div className='sidebar' data-testid = 'sidebar'>
      <p className = 'todo__text'>ToDoApp</p>

      <ul className = 'sidebar__top'>
        <li onClick= {() => {getInbox(); setActive('Inbox'); setCurrentId(null)}}
        data-tesid='inbox'
        className={active === 'inbox' ? 'active': undefined}><InboxIcon fontSize='small'/><span>Inbox</span></li>
        <li onClick= {()=> {getToday(); setActive('Today'); setCurrentId(null)}}
            data-tesid='today'
            className={active === 'today' ? 'active': undefined}
         ><TodayIcon fontSize='small'/><span>Today</span></li>
        <li onClick= {()=> {getNext(); setActive('Next Days'); setCurrentId(null)}}
            data-tesid='next days'
            className={active === 'Next Days' ? 'active': undefined}><NextWeekIcon fontSize='small'/><span>Next days</span></li>
      </ul>
      {/* <div className = 'sidebar__middle' onClick= {()=>setShowProjects(!showProjects)}>
        <span><IconButton size='medium' className= {!showProjects ? 'hidden-projects' : undefined}><ExpandMoreIcon fontSize='inherit'/></IconButton></span>
        <h2>Projects</h2>
      </div> */}
      <ul className = 'sidebar__projects'>
        {/* {showProjects &&  <Projects  active= {active} setActive={setActive} currentId = {currentId} setCurrentId ={setCurrentId} />} */}
      </ul>
      {showProjects && <AddProject userId = {userId} />}
      <div className = 'logout__and__help'>
        <div className = 'logout'onClick = {()=>logout()}>
        <IconButton size= 'medium'><ExitToApp/></IconButton>
        <span className = 'logout__text'>Log Out</span>
        </div>
        <div className = 'help'> 
          <IconButton><LiveHelp/></IconButton>
          <span className = 'logout__text' onClick = {()=>goToHelp()}>Help</span>
        </div>
      </div>
     
      
    </div>
  )
}
