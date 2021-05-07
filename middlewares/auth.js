import CustomeErrorHandler from "../services/CustomeErrorHandler"
import JwtService from '../services/JwtService'

const auth = async  (req,res,next) => {
    let authHeader = req.headers.authorization;
    // console.log(authHeader)
    if(!authHeader) {
        return next(CustomeErrorHandler.unAuthorized());
    }

    const token = authHeader.split(' ')[1];
    // console.log(token)
    try{
        const { _id , role } = await JwtService.verify(token)
        const user = {
            _id,
            role
        };
        // console.log(user)
        req.user = user
        next()
        
    } catch(err){
        return next(CustomeErrorHandler.unAuthorized());
    }
}


export default auth