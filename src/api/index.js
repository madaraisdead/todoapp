import axios from 'axios'
import moment from 'moment'

const urlProjects = 'http://localhost:5000/projects'
const urlTasks = 'http://localhost:5000/tasks'
const urlLists = 'http://localhost:5000/lists'
const urlUsers = 'http://localhost:5000/users'

axios.defaults.withCredentials = true

//PROJECTS
export const fetchProjects = () => axios.get(urlProjects)
export const createProject = (newProject) => axios.post(urlProjects,newProject)
export const deleteProject =(id) => axios.delete(`${urlProjects}/${id}`)

//TASKS
export const fetchTasks = () => axios.get(urlTasks)
export const createTask = (newTask) => axios.post(urlTasks, newTask)
export const completeTask = (id) => axios.post(`${urlTasks}/${id}/complete`)
export const getProjectTasks = (id) => axios.get(`${urlTasks}/project/${id}`)
export const getTodayTasks = () => axios.get(`${urlTasks}/today`)
export const getNextDaysTasks = () => axios.get(`${urlTasks}/nextDays`)
export const getProjectById = (id) => axios.get(`${urlProjects}/${id}`)
export const deleteTask = (id) => axios.delete(`${urlTasks}/${id}`)

//LISTS
export const fetchLists = () => axios.get(urlLists)
export const updateList = (id,task) => axios.post(`${urlLists}/${id}`, {text: `${task}` })
export const createList = (newList) => axios.post(`${urlLists}`, newList)
export const moveTasks = (id,list) => axios.put(`${urlLists}/move/${id}`, list)

//USERS
export const signup = (user) => axios.post(`${urlUsers}/signup`, user)
export const  signin = (user) => axios.post(`${urlUsers}/signin`, user)