import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'


const AuthContext = createContext({})


export const AuthContextProvider =(props)=>{

    const [loggedIn, setLoggedIn] = useState()
    const [userId, setUserId] = useState()
    const [username, setUsername] = useState()
    
    async function getLoggedIn(){
        const loggedInRes = await axios.get("http://localhost:5000/users/loggedin")
        const id = await axios.get("http://localhost:5000/users/userId")
        const name = await axios.get("http://localhost:5000/users/username")
        setUserId(id.data)
        setLoggedIn(loggedInRes.data)
        setUsername(name.data[0].name)
    }
    useEffect(()=>{
        getLoggedIn()
    }, [])
    return(
        <AuthContext.Provider value= {{username, loggedIn, userId, getLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext