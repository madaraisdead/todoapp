import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import projectRoutes from './routes/projects.js'
import tasksRoutes from './routes/tasks.js'
import listsRoutes from './routes/lists.js'
import userRoutes from './routes/users.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(cors({
    origin : ['http://localhost:3000'],
    credentials: true
}))
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next()
})

app.use('/projects', projectRoutes)
app.use('/tasks', tasksRoutes)
app.use('/lists', listsRoutes )
app.use('/users', userRoutes)

const CONNECTION_URL = 'mongodb+srv://admin:admin@cluster0.mjtlt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>app.listen(PORT, ()=>console.log(`server running on port : ${PORT}`)))
.catch((error)=> console.log(error.message))

mongoose.set('useFindAndModify', false)
