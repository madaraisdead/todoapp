import React, {createRef} from 'react'
import FlagIcon from '@material-ui/icons/Flag';
import {motion} from 'framer-motion'

export const TaskPriority = ({ changeColor, setPriority, setShowPriority, showPriority, selectedProject, task })=>{
  let color1  = createRef()
  const getColor1 = () =>{
    const computed =  getComputedStyle(color1.current);
    return computed.color
  }
  let color2  = createRef()
  const getColor2 = () =>{
    const computed =  getComputedStyle(color2.current);
    return computed.color
  }
  let color3  = createRef()
  const getColor3 = () =>{
    const computed =  getComputedStyle(color3.current);
    return computed.color
  }
  let color4  = createRef()
  const getColor4 = () =>{
    const computed =  getComputedStyle(color4.current);
    return computed.color
  }
  return(
    showPriority && (

      <motion.div initial={{y : -100, opacity: 0}} animate={{ y: 0, opacity: 1 }} transition={{duration: .5}}  className = 'task-priority'>
        <ul className = 'task-priority__list' >
          <li ref = {color1} className = 'task-priority__list__1' onClick = {()=> {setShowPriority(false); setPriority(1); changeColor(getColor1())}}>
            <span>
                <FlagIcon/>
            </span>
            <span>Priority 1</span>
          </li>
          <li ref = {color2} className = 'task-priority__list__2' onClick = {()=> {setShowPriority(false); setPriority(2); changeColor(getColor2())}}>
            <span>
                <FlagIcon/>
            </span>
            <span>Priority 2</span>
          </li>
          <li ref = {color3} className = 'task-priority__list__3' onClick = {()=> {setShowPriority(false); setPriority(3); changeColor(getColor3())}}>
            <span>
                <FlagIcon/>
            </span>
            <span>Priority 3</span>
          </li>
          <li ref = {color4} className = 'task-priority__list__4' onClick = {()=> {setShowPriority(false); setPriority(4); changeColor(getColor4())}}>
            <span>
                <FlagIcon/>
            </span>
            <span>Priority 4</span>
          </li>
        </ul>
      </motion.div>
    )
)
}
