import React, { useState, useEffect, setState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createList, getLists, moveTasks } from '../actions/lists'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FlagIcon from '@material-ui/icons/Flag';
import DoneIcon from '@material-ui/icons/Done';
import { TaskDate } from './TaskDate'
import { TaskPriority } from './TaskPriority'
import { AddTask } from './AddTask';
import { AddTaskBoard } from './AddTaskBoard';
import { completeTask, deleteTask } from '../actions/tasks'
import {motion} from 'framer-motion'

import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { BoardTasks } from './BoardTasks';
import { ContactsOutlined } from '@material-ui/icons';
import { AddList } from './AddList';

export const  BoardWrapper = ({userId, showAddTaskMain = true, shouldShowMain = false,currentId})=>{

    const lists = useSelector(state => state.lists)
    const tasks = useSelector(state => state.tasks)
    const projects = useSelector(state => state.projects)
    const dispatch = useDispatch()
    
    const [addList, setAddList] = useState(false)
    const [task, setTask] = useState('')
    const [date, setDate] = useState('')
    const [showTaskDate, setShowTaskDate] = useState(false)
    const [showPriority, setShowPriority] = useState(false)
    const [priority, setPriority] = useState(false)
    const [showMain, setShowMain] = useState(shouldShowMain)
    const [taskData, setTaskData] = useState({title: '', project : '', priority: '', color: '', date: '', completed: false, list: ''})
    const [isList, setIsList] = useState(true)
    const [showDelete, setShowDelete] = useState(false)
        const getCurrentId = () =>{
        for (let i=0; i<projects.length; i++){
            if (projects[i]._id === currentId) return (projects[i]._id)
          }
      }
    
    const getAll = ()=>{
        dispatch(getLists())
    }
    const toMoveTasks = (id,list) =>{
        dispatch(moveTasks(id,list))
    }
      const onDragEnd = async (result) =>{
          if (!result.destination) return

          if (result.destination.droppableId === result.source.droppableId){
            const destArray = Array.from(lists.filter(list=> list._id === result.destination.droppableId))
            const sourceArray = Array.from(lists.filter(list => list._id === result.source.droppableId))
            const [reorderedTask] = sourceArray[0].tasks.splice(result.source.index, 1)
            sourceArray[0].tasks.splice(result.destination.index, 0 , reorderedTask)
            const id = result.destination.droppableId
            toMoveTasks(id,sourceArray[0])
            
          }
           if (result.destination.droppableId !== result.source.droppableId){
            const startArray = lists.find(list => result.source.droppableId === list._id)
            const card = startArray.tasks.splice(result.source.index,1)
            const endArray = lists.find(list=> result.destination.droppableId === list._id)
            endArray.tasks.splice(result.destination.index, 0, ...card)
            console.log(endArray)
            console.log(startArray)
            toMoveTasks(result.destination.droppableId, endArray)
            toMoveTasks(result.source.droppableId, startArray)
          }
           
        
      }
      useEffect(()=>{
        getAll()
      },[lists])

    
    const [listData, setListData] = useState({title: '', project: getCurrentId(), tasks: []})
    return(
        <DragDropContext onDragEnd ={onDragEnd}>
        <div className = 'board__wrapper'>
            <div className = 'board'>
            {lists && lists.map(list =>( 
                list.project  === getCurrentId() &&
                    <Droppable key={list._id} droppableId = {list._id}>
                        {provided =>(
                             <div key = {list._id} className = 'board__column' {...provided.droppableProps} ref= {provided.innerRef}>
                             <div className = 'list__header'>
                                 <input type = 'hidden' value = {list._id} name = 'listId'/>
                                 <span className = 'list__header__text'>{list.title}</span>
                                 <div className = 'list__header__menu'><MoreHorizIcon onClick = {()=> setShowDelete(!showDelete)} className = 'list__header__menu__icon' fontSize = 'small'/> <span className = 'list__header__tasks'>{list.tasks.length}</span></div>
                             </div>
                             {
                                 
                                 list.tasks && list.tasks.map((task, index) =>(
                                    <BoardTasks key = {task._id} task = {task} index= {index}/>
                                 )      
                                 )
                             }
                             {provided.placeholder}
                                 <div className = 'list__footer' onClick = {()=> setShowMain(!showMain)}>
                                     {/* <span className = 'list__footer__icon'><AddIcon fontSize = 'small'/></span>
                                     <span className = 'list__footer__text'>Add task</span> */}
                                     <AddTask currentId= {getCurrentId()} userId = {userId} listId = {list._id} isList= {isList} className = ''list__footer__add-task/>
                                 </div>
                                 
                         </div>
                        )}
            </Droppable>
            ))}
             <div className = 'add-list__section'>
                    <div className ='add-list__section__content' onClick={()=> setAddList(!addList)}>
                        <span><AddIcon fontSize = 'small'/></span> 
                        <span>Add List</span>
                    </div>
                    
              </div>
              {
                            addList ?
                            <AddList projectId = {currentId} setAddList = {setAddList} addList = {addList} listData = {listData} setListData = {setListData}/>
                            :null
                        }
            </div>  
        </div>
        </DragDropContext>
    )
}