import React, {useEffect, useState} from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AddTask } from '../AddTask'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import logo from '../../img/Product.png'

export const Header = ({username}) =>{
  const [shouldShowMain, setShouldShowMain] = useState(false)
  const [showQuicAddTask, setShowQuicAddTask] = useState(false)
  async function logout(){
    await axios.get('http://localhost:5000/users/logout')
    window.location = '/'
  }
  return (
    <header className = 'header' data-testid = 'header'>
      <nav>
          <div className = 'settings'>
          <div className = 'header__text'>
          <span className = 'header__username'>Hello <span className = 'header__username__text'>{username}</span></span>
          <span className='header__welcome'>Welcome to your dashboard!</span>
          </div>
          {/* <span className = 'help'><a href = '/help'>Help</a></span> */}
          {/* <ul>
            <li className='settings__add' onClick = {()=> {setShowQuicAddTask(true); setShouldShowMain(true)}}><IconButton size = 'small'><AddIcon/></IconButton></li>
            <li><IconButton size = 'small'><NotificationsIcon/></IconButton></li>
            <li><IconButton size= 'small' onClick = {()=>logout()} ><ExitToAppIcon/></IconButton></li>
          </ul> */}
          </div>
      </nav>
      {/* <AddTask
      showAddTaskMain={false}
      shouldShowMain = {shouldShowMain}
      showQuicAddTask = {showQuicAddTask}
      setShowQuicAddTask = {setShowQuicAddTask}/> */}
       
    </header>
  )
}
