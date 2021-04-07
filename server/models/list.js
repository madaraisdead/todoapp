import mongoose from 'mongoose'

const listSchema = mongoose.Schema(
    {
        title : String,
        project: String,
        tasks: [{
            text: String
        }],
    }
)

const List = mongoose.model('List', listSchema)
export default List