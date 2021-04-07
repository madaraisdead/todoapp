import React from 'react'
import moment from 'moment'
import TodayIcon from '@material-ui/icons/Today';
import BookIcon from '@material-ui/icons/Book';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import {motion} from 'framer-motion'

export const TaskDate = ({ setDate , setShowTaskDate, showTaskDate }) =>{
  return(
    showTaskDate && (
      <motion.div initial={{y : -100, opacity: 0}} animate={{ y: 0, opacity: 1 }} transition={{duration: .5}}  className = 'task-date' >
        <ul className = 'task-date__list' >
          <li onClick = {()=> {setShowTaskDate(false); setDate('today')}}>
            <span>
                <TodayIcon/>
            </span>
            <span>Today</span>
          </li>
          <li onClick = {()=> {setShowTaskDate(false); setDate('next days')}}>
            <span>
                <BookIcon/>
            </span>
            <span>Tomorrow</span>
          </li>
          <li onClick = {()=> {setShowTaskDate(false); setDate('next days')}}>
            <span>
                <NextWeekIcon/>
            </span>
            <span>Next Week</span>
          </li>
        </ul>
      </motion.div>
    )
  )
}
