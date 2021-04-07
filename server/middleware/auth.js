import jwt from 'jsonwebtoken'

const auth = async(req,res,next) =>{
    try {
        const token = req.cookies.token
        if (!token) return res.status(401).json({message: 'You need to sign in'})

        const verified = jwt.verify(token, 'test')
        req.userId = verified.id
        next()
    } catch (error) {
        res.status(401).json({message: error.message})
    }
}
function authRole (userId){
    return (req,res,next) =>{
        if (req.userId !== userId) {
            res.status(401).send('Not Allowed')
        }
        next()
    }
}
export {auth, authRole}