import React from 'react'
import { useDispatch } from 'react-redux'
import { createList } from '../actions/lists'
import {motion} from 'framer-motion'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export const AddList = ({listData, setListData, setAddList, addList, projectId})=>{
    const dispatch = useDispatch()
    const notify = () =>{
        toast.error('Empty title', {position: toast.POSITION.TOP_RIGHT})
      }
      const correct = () =>{
        toast.success('List added', {position: toast.POSITION.BOTTOM_RIGHT})
      }
    const toCreateList = (list) =>{
        if (listData.title){
            dispatch(createList(list))
            clear(); setAddList(!addList)
            correct()
        }
        else notify()
    }
    
    const clear = () =>{
        setListData({...listData, title: ''})
    }

    return (
        <motion.div initial={{y : -100, opacity: 0}} animate={{ y: 0, opacity: 1 }} transition={{duration: .5}} className ='add-list'>
            <h2 style= {{fontWeight: 600}}>Adding a List</h2>
            <motion.input initial={{x : -600}} animate={{ x: 0 }} transition={{delay: .7}} className = 'add-list__input' value = {listData.title} onChange = {(e) => setListData({...listData, title : e.target.value, project: projectId})}></motion.input>
                <div className = 'add-list__actions'>
                      <motion.span initial={{x : -100}} animate={{ x: 0 }} transition={{delay: .3}} className = 'add-list__submit' onClick = {()=> {toCreateList(listData); }}>Add</motion.span>
                     <motion.span initial={{opacity : 0}} animate={{ opacity: 1 }} transition={{delay: 1}} className = 'add-list__cancel' onClick= {()=>{clear(); setAddList(!addList)}}>Cancel</motion.span>
                </div>   
        </motion.div>
       
    )
}