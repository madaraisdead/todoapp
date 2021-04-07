import React, { useContext, useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { signup } from '../../actions/users'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import {motion} from 'framer-motion'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

export const SignUp = () =>{
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    const {loggedIn, getLoggedIn} = useContext(AuthContext)
    const notify = () =>{
        toast.error('Invalid credentials', {position: toast.POSITION.TOP_RIGHT})
    }
    const pass = () =>{
        toast.error('Passwords do not match', {position: toast.POSITION.TOP_RIGHT})
    }
    
    const toSignUp = async () =>{
        if(!firstName || !lastName || !email || !password || !confirmPassword) {
            notify()
        }
        else if (password !== confirmPassword){
            pass()
        }
        else{
            try {
                const userData ={
                    firstName,
                    lastName,
                    email,
                    password,
                    confirmPassword,
                }
              await dispatch(signup(userData))
              getLoggedIn()
            } catch (error) {
                console.log(error)
            }
        }
       
    }

    return(
        <>
            {
                loggedIn ? <Redirect to = '/'/> : (
                    <div className = 'signup__main'>
                    <div className= 'signup__form'>
                            <h1>Sign <span className ='falling__u'>U</span>p</h1>
                            <div className= 'signup__form__field'>
                                <motion.label initial = {{opacity: 0}} animate ={{opacity: 1}} delay ={{delay  : .2}} className = 'signup__form__field__label'>First Name</motion.label>
                                <input value ={firstName} onChange = {(e)=> setFirstName(e.target.value)} placeholder = 'Enter first name' className = 'signup__form__field__input'></input>
                            </div>
                            <div className= 'signup__form__field'>
                                <label className = 'signup__form__field__label'>Last Name</label>
                                <input value ={lastName} onChange = {(e)=> setLastName(e.target.value)} placeholder = 'Enter last name' className = 'signup__form__field__input'></input>
                            </div>
                            <div className= 'signup__form__field'>
                                <label className = 'signup__form__field__label'>Email</label>
                                <input value ={email} onChange = {(e)=> setEmail(e.target.value)} placeholder = 'Enter email' className = 'signup__form__field__input'></input>
                            </div>
                            <div className= 'signup__form__field'>
                                <label className = 'signup__form__field__label'>Password</label>
                                <input type='password' value ={password} onChange = {(e)=> setPassword(e.target.value)} placeholder = 'Enter password' className = 'signup__form__field__input'></input>
                            </div>
                            <div className= 'signup__form__field'>
                                <label className = 'signup__form__field__label'>Confirm Password</label>
                                <input type ='password' value ={confirmPassword} onChange = {(e)=> setConfirmPassword(e.target.value)} placeholder = 'Confirm password' className = 'signup__form__field__input'></input>
                            </div>
                            <motion.button initial = {{y: -800}} animate ={{y: 0}} transition= {{delay: .8, duration: .5}} className= 'signup__form__submit' onClick= {()=> toSignUp()}>Sign Me Up</motion.button>
                            <motion.div initial = {{y: 800}} animate ={{y: 0}} transition= {{delay: .5, duration: .5}} className='signup__form__login'>
                                <span className = 'signup__form__login__text'>Already registered?</span>
                                <Link className = 'signup__form__login__link' to = '/signin'>Log In</Link>
                            </motion.div>
                    </div>
                </div>
                )
            }
        </>
       
    )
}