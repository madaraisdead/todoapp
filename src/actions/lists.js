import * as api from '../api'

export const getLists = () => async(dispatch) => {

    try {
        const { data } = await api.fetchLists()
        dispatch({type: 'FETCH_LISTS', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}
export const createList = (list) => async(dispatch) =>{
    try {
        const { data } = await api.createList(list)
        dispatch({type: 'CREATE_LIST', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}
export const updateList = (id, task) => async(dispatch) =>{
    try {
        const { data } = await api.updateList(id,task)
        dispatch({ type: 'UPDATE_LIST', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}
export const moveTasks = (id,list) => async(dispatch) =>{
    try {
        const {data} = await api.moveTasks(id,list)
        dispatch({type: 'MOVE_TASKS', payload: data})
    } catch (error) {
        console.log(error.message)
    }
}