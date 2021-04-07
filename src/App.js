import React, { useContext, useEffect, useState } from 'react'
import { Header } from './components/layout/Header'
import { Content } from './components/layout/Content'
import { useDispatch } from 'react-redux'
import { getProjects } from './actions/projects'

import { getTasks, getProjectTasks } from './actions/tasks'
import { getLists } from './actions/lists'


import { BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import { SignUp } from './components/start/SignUp'
import { LogIn } from './components/start/LogIn'
import AuthContext, { AuthContextProvider } from './context/AuthContext'
import { history } from './index'
import axios from 'axios'
import { Sidebar } from './components/layout/Sidebar'
import { Help } from './components/Help'
export const App = () => {
  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null)
  const [active, setActive] = useState('')
  const {username, loggedIn, userId} = useContext(AuthContext)


  console.log(loggedIn)
  console.log(userId)
  console.log(username)



  useEffect(()=>{
    dispatch(getProjects())
    dispatch(getTasks())
    dispatch(getLists())
  }, [dispatch, loggedIn])

  return(
    <BrowserRouter>
        <div className="App">
          <Switch>
                <Route exact path = '/'>
                      { !loggedIn ? <Redirect to = 'signin'/> :
                         (
                          <>
                              <Sidebar userId = {userId} active={active} setActive ={ setActive} currentId = {currentId} setCurrentId={setCurrentId} />
                          <Header username = {username}/>
                          <Content userId = {userId} setCurrentId = {setCurrentId} currentId = {currentId} active ={active} setActive = {setActive} />
                          </>
                         
                        ) 
                      }  
                </Route>
                     <Route exact path = '/signin'>
                       <LogIn loggedIn = {loggedIn}/>
                     </Route>
                     <Route exact path = '/signup'>
                       <SignUp />
                     </Route> 
                     <Route exact path = '/help'>
                       <Help/> 
                      </Route> 
     
          </Switch>
        </div>
    </BrowserRouter>
  )

}
