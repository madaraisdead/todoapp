import mongoose from 'mongoose'
import User from '../models/user.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Email } from '@material-ui/icons'

export const signin = async (req,res) =>{
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.status(404).json({message: 'User does not exist'})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(400).json({message: 'Invalid password'})

        const token = jwt.sign({ email : existingUser.email, id: existingUser._id }, 'test', {expiresIn: '30d'})
        res.cookie('token', token, {httpOnly: true}).send()
        res.status(200).json({result:  existingUser, token})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const signup = async (req,res) =>{
    const { email, password, confirmPassword, firstName, lastName } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({message: 'User exists'})

        if (password !== confirmPassword) return res.status(400).json({message : 'Passwords do not match'})

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password : hashedPassword, name: `${firstName} ${lastName}`})
        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: '30d'})
        res.cookie('token', token, {httpOnly: true}, 'userId', result._id).send()
        res.status(200).json({result, token})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
export const logout = async (req,res) =>{
    res.cookie('token', '', {
        httpOnly :true,
        maxAge : 1,
    }).send()
    res.redirect('/')
    res.send(200).json({message: 'Logged Out'})
}

export const loggedin = async(req,res) =>{
        try {
            const token = req.cookies.token
            if (!token) return res.json(false)
            jwt.verify(token, 'test')
            res.send(true)
        } catch (error) {
            res.json(false)
        }
    
}
export const getUserId = async(req,res) =>{
    const id = req.userId
    res.send(id)
}

export const getUsername = async( req,res) =>{
    
    try {
        const id = req.userId
        const user = await User.find({_id: id})
        res.status(200).json(user) 
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}