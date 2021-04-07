import React, {useEffect} from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'



export const BoardTasks = ({task, index})=>{
  const tasks = useSelector(state  => state.tasks)

  return(
    <Draggable key={task._id} draggableId = {task._id} index = {index} >
      {(provided) =>(
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref = {provided.innerRef}>
        {
            <div key ={task._id} className = 'list__task'>
            <input type = 'hidden' value = {task._id} name = 'id'></input>
            {/* <div className='checkbox__holder' data-testid = 'checbox__action' onClick = {()=> toCompleteTask(task._id)}>
            <span className="checkbox"><DoneIcon className= 'checkbox__icon'  fontSize = 'small'/></span>
            </div> */}
            <span className = 'list__task_text' style ={{textDecoration : task.completed ? 'line-through' : 'none'}}>{task.text}</span>
            </div>
        }
      </div>
      )}
    </Draggable>
  )
}
