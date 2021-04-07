import * as api from '../api'

export const signup = (user) => async(dispatch) =>{
    try {
        const { data } = await api.signup(user)
        dispatch({type: 'CREATE_USER', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const signin =(user) => async(dispatch) =>{
    try {
        const { data } = await api.signin(user)
        dispatch({type: 'FETCH_USERS',payload: data})
    } catch (error) {
        console.log(error)
    }
}
