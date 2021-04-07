import React , { useState, useEffect} from 'react'

import CancelIcon from '@material-ui/icons/Cancel';
import {ProjectOverlay} from './ProjectOverlay'
import { TaskDate } from './TaskDate'
import ScheduleIcon from '@material-ui/icons/Schedule';
import FolderIcon from '@material-ui/icons/Folder';
import FlagIcon from '@material-ui/icons/Flag';
import { TaskPriority } from './TaskPriority'
import { useDispatch, useSelector } from 'react-redux'
import { createTask } from '../actions/tasks'
import { updateList } from '../actions/lists'
import {motion} from 'framer-motion'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export const AddTask = ({userId, showAddTaskMain = true, shouldShowMain = false, showQuicAddTask, setShowQuicAddTask, isList, listId, currentId}) =>
{
  const projects = useSelector(state=> state.projects)

  const getProjectId = () => {
    for (let i=0; i<projects.length; i++){
      if (projects[i]._id === currentId) return (projects[i]._id)
    }
  }
  const notify = () =>{
    toast.error('Invalid credentials', {position: toast.POSITION.TOP_RIGHT})
  }
  const correct = () =>{
    toast.success('Task added', {position: toast.POSITION.BOTTOM_RIGHT})
  }
  const [taskData, setTaskData] = useState({title: '', project : getProjectId(), priority: '', color: '', date: 'today', userId: userId, completed: false})
  const [task, setTask] = useState('')
  const [date, setDate] = useState('')
  const [project, setProject] = useState('')
  const [showMain, setShowMain] = useState(shouldShowMain)
  const [showProjectOverlay, setShowProjectOverlay] = useState(false)
  const [showTaskDate, setShowTaskDate] = useState(false)
  const [showPriority, setShowPriority] = useState(false)
  const [priority, setPriority] = useState(false)
  const [title, setTitle] = useState('')
  const [currentListId, setCurrentListId] = useState(listId)
  const lists = useSelector(state => state.lists)
  const [newListId, setNewListId] = useState(listId)
  const dispatch = useDispatch()
  const clear = ()=>{
    setTaskData({title: '', project : getProjectId(), priority: '', color: '', date: 'today', completed: false, list: '', userId : userId})
  }
  
  const addTask = async (taskData)=>{
    if (taskData.title) {
      console.log(taskData)
       await dispatch(createTask(taskData))
       correct()
       setShowMain(false)
       clear()
    }
   
    else notify()
  }
  const toUpdateList = (id, task) =>{
    dispatch(updateList(id, task))
  }
  
  return(
    <div className = { showQuicAddTask ? ' add-task add-task__overlay' : 'add-task'}
      data-testid = 'add-task-comp'>
      {showAddTaskMain && (
        <div
         className="add-task__shallow"
         onClick={() => {setShowMain(!showMain)}}
         onKeyDown={(e) => {
           if (e.key === 'Enter') setShowMain(!showMain);
         }}
         tabIndex={0}
         aria-label="Add task"
         role="button"
       >
         <span className="add-task__plus">+</span>
         <span className="add-task__text">Add Task</span>
       </div>
      )}
      {
        (showMain || showQuicAddTask) &&(
          <motion.div initial ={{opacity: 0}} animate = {{opacity:1}} className= 'add-task__main'>
              {showQuicAddTask&&(
                <>
                  <div>
                    <h2 className= 'header'>Quick Add Task</h2>
                    <span className='add-task__cancel'
                      onClick ={()=>{
                        setShowMain(false)
                        setShowProjectOverlay(false)
                        setShowQuicAddTask(false)
                      }}>
                          <CancelIcon/>
                      </span>
                  </div>
                </>
              )}

             <ProjectOverlay setProject = { project =>{setTaskData({...taskData, project: project})}} showProjectOverlay = {showProjectOverlay} setShowProjectOverlay = {setShowProjectOverlay}/>
             <TaskDate setDate = {date => {setTaskData({...taskData, date: date})}} setShowTaskDate = {setShowTaskDate} showTaskDate = {showTaskDate}/>
             <TaskPriority changeColor={color => {setTaskData({...taskData, color: color})}} setPriority={setPriority} setShowPriority={setShowPriority} showPriority={showPriority} task = {task}/>
              <input
              className = 'add-task__content'
              type = 'text'
              value = {taskData.title}
              onChange = {(e)=>{setNewListId(listId);console.log(newListId);setTaskData({...taskData, title: e.target.value, list: listId}); setTitle(taskData.title)}}
              />
              <motion.button initial={{x : -100}} animate={{ x: 0 }} type = 'button' className = 'add-task__submit' onClick ={()=>{if (showMain) {(addTask(taskData))} 
              if (isList) {toUpdateList(newListId, taskData.title); console.log(title)}
                 }}>
              Add Task
              </motion.button>

              {!showQuicAddTask && (
                <motion.span initial={{y : -600}} animate={{ y: 0 }} transition= {{delay: .5}} className = 'add-task__cancel' onClick ={()=>{setShowMain(false); setShowProjectOverlay(false)}} >
                  Cancel
                </motion.span>
              )}
              <motion.span initial={{opacity: 0}} animate= {{opacity:1}} className = 'add-task__project' onClick= {()=>setShowProjectOverlay(!showProjectOverlay)}>
                <FolderIcon/>
              </motion.span>
              <motion.span initial={{opacity: 0}} animate= {{opacity:1}} transition={{ delay: .5 }} className = 'add-task__date' onClick= {()=>setShowTaskDate(!showTaskDate)}>
                <ScheduleIcon/>
              </motion.span>
              <motion.span initial={{opacity: 0}} animate= {{opacity:1}} transition={{ delay: 1 }} className = 'add-task__priority' onClick= {()=>setShowPriority(!showPriority)}>
                <FlagIcon/>
              </motion.span>
          </motion.div>
        )
      }

    </div>
  )
}
