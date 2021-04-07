import React, { useState } from 'react'
import { TaskDate } from './TaskDate'
import ScheduleIcon from '@material-ui/icons/Schedule';
import FolderIcon from '@material-ui/icons/Folder';
import FlagIcon from '@material-ui/icons/Flag';
import { TaskPriority } from './TaskPriority'
import { useDispatch } from 'react-redux'
import { createTask } from '../actions/tasks'


export const AddTaskBoard = ({showAddTaskMain = true, shouldShowMain}) =>{
    const [showMain, setShowMain] = useState(shouldShowMain)
    const [taskData, setTaskData] = useState({title: '', project : '', priority: '', color: '', date: '', completed: false})
    const [task, setTask] = useState('')
    const [date, setDate] = useState('')
    const [showTaskDate, setShowTaskDate] = useState(false)
    const [showPriority, setShowPriority] = useState(false)
    const [priority, setPriority] = useState(false)
    return(
        <>
        {showMain ? (
            <div className = 'list__footer__add-task'>
              <input
               className = 'list__footer__add-task__input'
                type = 'text'
                value = {taskData.title}
                onChange = {(e)=>{ setTaskData({...taskData, title: e.target.value})}}
                />
                <TaskDate setDate = {date => {setTaskData({...taskData, date: date})}} setShowTaskDate = {setShowTaskDate} showTaskDate = {showTaskDate}/>
                <TaskPriority changeColor={color => {setTaskData({...taskData, color: color})}} setPriority={setPriority} setShowPriority={setShowPriority} showPriority={showPriority}/>
               <span className = 'add-task__date' onClick= {()=>setShowTaskDate(!showTaskDate)}>
                 <ScheduleIcon/>
                </span>
                <span className = 'add-task__priority' onClick= {()=>setShowPriority(!showPriority)}>
                  <FlagIcon/>
                </span>
             </div>
            )
            :
            <></>
        }
</>
    )
}

 