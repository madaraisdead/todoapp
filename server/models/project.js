import mongoose from 'mongoose'

const projectSchema = mongoose.Schema(
  {
    title: String,
    creator: String,
    createdAt: {
      type : Date,
      default : new Date(),
    },
    color: String,
    type: String,
    userId: String,
    lists : [
      
    ]
  }
)

const Project = mongoose.model('Project', projectSchema)

export default Project
