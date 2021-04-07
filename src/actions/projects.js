import * as api from '../api'


//action creators
export const getProjects = () => async (dispatch) => {

  try{
    const { data } = await api.fetchProjects()
    dispatch({type : 'FETCH', payload: data })
  }
  catch (error){
      console.log(error.message)
  }
}

export const createProject = (project) => async (dispatch) =>{
  try{
    const { data } = await api.createProject(project)
    dispatch({type : 'CREATE', payload: data})
  }
  catch(error){
    console.log(error.message)
  }
}

export const deleteProject = (id) => async(dispatch) =>{
  try {
    await api.deleteProject(id)
    dispatch({type: 'DELETE_PROJECT', payload: id})
  } catch (error) {
    console.log(error)
  }
}

export const getProjectById = (id) => async(dispatch) =>{
  try {
    const { data } = await api.getProjectById(id)
    dispatch ({type: 'PROJECT_BY_ID', payload: data.title})
    console.log(data.title)
  } catch (error) {
    
  }
}
