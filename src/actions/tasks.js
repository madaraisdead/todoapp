import * as api from '../api'

export const getTasks = () => async (dispatch)=>{
    try{
        const { data } = await api.fetchTasks()
        dispatch({type : 'FETCH_TASKS', payload: data })
      }
      catch (error){
          console.log(error.message)
      }
}

export const createTask = (task) => async (dispatch) =>{
    try{
      const { data } = await api.createTask(task)
      dispatch({type : 'CREATE_TASK', payload: data})
    }
    catch(error){
      console.log(error.message)
    }
  }

export const completeTask = (id) => async (dispatch) =>{
  try{
    const { data } =  await api.completeTask(id)
    dispatch({type: 'COMPLETE_TASK', payload: data})
  }
  catch(error){
    console.log(error.message)
  }
}

export const getProjectTasks = (id) => async(dispatch) =>{
  try {
    const {data} = await api.getProjectTasks(id)
    dispatch({type : 'PROJECT_TASKS', payload: data})
  } catch (error) {
    console.log(error.message)
  }
}
export const getTodayTasks = () =>async(dispatch) =>{
  try {
    const {data} = await api.getTodayTasks()
    dispatch({type: 'TODAY_TASKS', payload : data})
  } catch (error) {
    console.log(error.message)
  }
}
export const getNextDaysTasks = () =>async(dispatch) =>{
  try {
    const {data} = await api.getNextDaysTasks()
    dispatch({type: 'NEXTDAYS_TASKS', payload : data})
  } catch (error) {
    console.log(error.message)
  }
}
export const deleteTask = (id) => async(dispatch) => { 
  try {
    await api.deleteTask(id)
    dispatch({type: 'DELETE_TASK', payload: id})
  } catch (error) {
    console.log(error.message)
  }
}