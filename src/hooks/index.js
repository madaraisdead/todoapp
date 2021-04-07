import {useState, useEffect } from 'react'
import { firebase } from '../firebase'
import moment from 'moment'
import { tasksExist } from '../helpers'

export const useTasks = selectedProject =>{
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  useEffect(()=>{
    let unsubscribe = firebase
    .firestore()
    .collection('tasks')
    .where('userId' , '==', '1')

    unsubscribe =
    selectedProject && !tasksExist(selectedProject)
    ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
    : selectedProject === 'TODAY'
    ? (unsubscribe = unsubscribe.where(
      'date', '==', moment().format('DD/MM/YYYY')
    ))
    :selectedProject === 'INBOX' || selectedProject === 0
    ? (unsubscribe)
    :unsubscribe

    unsubscribe = unsubscribe.onSnapshot(snapshot=>{
      const newTasks = snapshot.docs.map(task =>({
        id: task.id,
        ...task.data(),
      }))
      setTasks(
        selectedProject === 'NEXT_DAYS'
        ? newTasks.filter(
          task =>moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7

        )
        : newTasks
      )
      setCompletedTasks(newTasks.filter(task => task.completed !== false))
    })
    return () => unsubscribe()
  }, [selectedProject])
  return{ tasks, completedTasks }
}



export const useProjects = () =>{
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    firebase
    .firestore()
    .collection('projects')
    .where('userId', '==', '1')
    // .orderBy('projectId')
    .get()
    .then(snapshot =>{
      const allProjects = snapshot.docs.map(project => ({
        ...project.data(),
        docId : project.id,
      }))
      if (JSON.stringify(allProjects) !== JSON.stringify(projects)){
        setProjects(allProjects)
      }
    })
  }, [projects])

  return { projects, setProjects }
}
