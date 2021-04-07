import React, { useContext, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { signin} from '../../actions/users'
import AuthContext from '../../context/AuthContext'
import {motion} from 'framer-motion'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export const LogIn = (props) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const {loggedIn, getLoggedIn} = useContext(AuthContext)
    const notify = () =>{
        toast.error('Invalid credentials', {position: toast.POSITION.TOP_RIGHT})
    }
    
    const toSignIn = async (e) =>{
        try {
            if (!email || !password) {
             notify()
            }
            else{
                const userData ={
                    email,
                    password,
                }
              await dispatch(signin(userData))
               getLoggedIn()
            }
            
        } 
        
        catch (error) {
            console.log(error)
        }
    }
    return(
        <>
        {
            loggedIn ? <Redirect to = '/'/> : (
                <div className = 'signup__main'>
                     <div className= 'signup__form'>
                    <h1>L<span className = 'blink'></span>g In</h1>
                    <div className= 'signup__form__field'>
                        <motion.label initial = {{opacity: 0}} animate ={{opacity: 1}} delay ={{delay  : .2}} className = 'signup__form__field__label'>Email</motion.label>
                        <input value ={email} onChange = {(e)=> setEmail(e.target.value)} placeholder = 'Enter email' className = 'signup__form__field__input'></input>
                    </div>
                    <div className= 'signup__form__field'>
                        <motion.label initial = {{opacity: 0}} animate ={{opacity: 1}} transition= {{delay: .3}} className = 'signup__form__field__label'>Password</motion.label>
                        <input type= 'password' value ={password} onChange = {(e)=> setPassword(e.target.value)} placeholder = 'Enter password' className = 'signup__form__field__input'></input>
                    </div>
                    <motion.button initial = {{y: -800}} animate ={{y: 0}} transition= {{delay: .8, duration: .5}} className= 'signup__form__submit' onClick= {(e)=> toSignIn(e)}>Log Me In</motion.button>
                    <div className='signup__form__login'>
                        <span className = 'signup__form__login__text'>Not registered yet?</span>
                        <Link className = 'signup__form__login__link' to = '/signup'>Sign Up</Link>
                    </div>
            </div>
           
        </div>
            )
        }
            
        </>
        
    )
}