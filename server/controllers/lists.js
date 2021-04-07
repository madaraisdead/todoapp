import List from '../models/list.js'

export const getLists = async( req,res) =>{
    try {
        const lists = await List.find()
        res.status(201).json(lists)
    } catch (error) {
        res.status(404).json({message: error.message})
    }   
}

export const createList = async(req,res) =>{
    try {
        const list  = req.body
        const newList = new List(list)
        await newList.save()
        res.status(201).json(newList)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updateList = async (req,res) =>{
    try {
        const id = req.params.id
        const task = req.body
        const list = await List.findById(id)
        await list.update(
            {
                $push : {
                    tasks : task
                }
            }
        )
        res.status(201).json(list)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export const moveTasks = async (req,res)=>{
    try {
        const id = req.params.id
        const newList = await List.findById(id)
        await newList.update(req.body)
        await newList.save()
        res.json(newList)
    } catch (error) {
        res.json({message: error.mesage})
    }
}