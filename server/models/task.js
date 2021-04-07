import mongoose from 'mongoose'
import moment from 'moment'

const taskSchema = mongoose.Schema(
    {
        title : String,
        project : String,
        priority : Number,
        color: String,
        date: String,
        completed: Boolean,
        list: String,
        userId : String,
    }
)

const Task = mongoose.model('Task', taskSchema)
export default Task