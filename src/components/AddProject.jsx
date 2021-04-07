import React, { useEffect, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import { ProjectColor } from './ProjectColor'
import kanban from '../img/kanban.png'
import todo from '../img/todo.jpg'
import { useDispatch, useSelector} from 'react-redux'
import { createProject }  from '../actions/projects'
import { createList } from '../api';
import axios from 'axios';
import {motion} from 'framer-motion'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export const AddProject = ({ userId, shouldShow = false,}) => {

  const [show, setShow] = useState(shouldShow)
  const [projectData, setProjectData] = useState({title: '', color: '', type: '' , userId : userId })
  const [listData, setListData] = useState({title: '', project: ''})
  const [color, setColor] = useState()
  // const [projectId, setProjectId] = useState()
  const [checked, setChecked] = useState('default')
  const [showColor, setShowColor] = useState(false)
  const projects = useSelector((state)=> state.projects)
  const dispatch = useDispatch()

  console.log(projectData)
  const notify = () =>{
    toast.error('Empty title or no type for project', {position: toast.POSITION.TOP_RIGHT})
  }
  const correct = () =>{
    toast.success('Project added', {position: toast.POSITION.BOTTOM_RIGHT})
  }
  const addProject = async (projectData) =>{
    
    if (projectData.title && projectData.type === 'board') {
      await dispatch(createProject(projectData))
      setShow(!show)
      correct()
    }
    else if (projectData.title && projectData.type === 'default'){
      dispatch(createProject(projectData))
      setShow(!show)
      correct()
    }
    else notify()
  }
   let projectId
   
  if (typeof projects != "undefined" && projects != null && projects.length != null && projects.length) {projectId = (projects[projects.length - 1]._id)}

  
  const createDefaultList = async (listData) =>{ 
     setListData({ title: 'Todo' })
     dispatch(createList(listData))
  }
  const clear = () =>{
    setProjectData({title :'', color: '', type: '', userId: userId})
  }

  return(
    <div className= 'add-project'>
    <span className =  'add-project__plus'>+</span>
    <span className =  'add-project__text' onClick = {()=> setShow(!show)} data-testid="add-project-action">Add Project</span>
      {
        show &&
          <motion.div  className = 'add-project__overlay'>
            <motion.div initial={{opacity: 0}} animate ={{opacity: 1}} className = 'add-project__window'>
              <motion.div initial ={{opacity: 0}} animate= {{opacity: 1}} className = 'add-project__header'>
                <h2>Add project</h2>
              </motion.div>
              <div className = 'add-project__content'>
                <div className = 'add-project__content__form'>
                  <label className ='add-project__content__form__name'>Name</label>
                  <input value = {projectData.title} className= 'add-project__content__form__input' onChange = {(e)=> setProjectData({...projectData, title: e.target.value})}></input>
                </div>
                <ProjectColor changeColor = { color => setProjectData({...projectData, color: color})} setShowColor ={setShowColor} showColor = {showColor} />
                <div className = 'add-project__content__form'>
                  <label className ='add-project__content__form__name'>Color</label>
                  <button onClick={()=> setShowColor(!showColor)} className = 'add-project__content__dropdown' aria-haspopup = 'listbox' aria-expanded = 'false'>
                    <span className='add-project__content__dropdown__color' style = {{backgroundColor: projectData.color}}></span>
                    <span className='add-project__content__dropdown__name'></span>
                  </button>
                </div>
                <div className = 'add-project__content__form2'>
                <label className ='add-project__content__form2__name'>Type</label>
                <motion.div initial = {{y:100}} animate = {{y:0}} className='add-project__content__form2__board'>
                  <img className = { checked === 'board' ? 'board-checked' : undefined}alt = 'kanban' src = {kanban} width = '50%' height = '100%' onClick = {()=> {setProjectData({...projectData, type: 'board'}); setChecked('board')}}></img>
                  <span className='add-project__content__form2__board__text' onClick = {()=> {setProjectData({...projectData, type: 'board'}); setChecked('board')}}>Board Style</span>
                </motion.div>
                <motion.div initial = {{y:600}} animate = {{y:0}} transition = {{delay: 0.5}} className='add-project__content__form2__default'>
                  <img className = {checked === 'default' ? 'default-checked' : undefined} alt = 'kanban' src = {todo} width = '50%' height = '100%' onClick = {()=> {setProjectData({...projectData, type: 'default'});setChecked('default') }}></img>
                  <span className = 'add-project__content__form2__default__text' onClick = {()=> {setProjectData({...projectData, type: 'default'}); setChecked('default')}}>Default Style</span>
                </motion.div>
                </div>

              </div>
              <div className= 'add-project__footer'>
                <button type = 'button' className = 'add-project__footer__submit' onClick = {()=> {addProject(projectData);}}>Add</button>
                <button type = 'button' className = 'add-project__footer__cancel' onClick = {()=> {setShow(!show); clear()}}>Cancel</button>
              </div>
            </motion.div>

          </motion.div>
      }
    </div>
  )
}
