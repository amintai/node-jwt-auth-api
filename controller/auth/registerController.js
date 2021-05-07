import Joi from 'joi';
import { User , RefreshToken } from '../../models'
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService'
import { REFRESH_SECRET } from '../../config'

import CustomeErrorHandler from '../../services/CustomeErrorHandler';
// joi is regex avalidation library

 const registerController = {
   async register(req,res,next) {
        
        // checklist 

        // validate the request
        
        // authorize the request
        // chek if user is in the database already
        // prepare model
        // store in the database
        // generate jwt token
        // send response

        // validation
        const resiterSchema = Joi.object({
            name : Joi.string().min(3).max(30).required(),
            email : Joi.string().email().required(),
            password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password : Joi.ref('password')
        });

    
        const {error} = resiterSchema.validate(req.body)
    
        // if any error found code will not execute after next(error)
        if(error){
            return next(error);
        }

        // check if user is in the database already
        
        try{
            const exist = await User.exists({
                email : req.body.email
            });
            if(exist) {
                return next(CustomeErrorHandler.alreadyExist('This emial is already exist'))
            }
        } catch(err){
            return next(err)
        }

        // hash password
        const { name,email,password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            name,
            email,
            password:hashedPassword
        });

        let access_token;
        let refresh_token;
        try{
            const result = await user.save()
            console.log(result)

            // Token JWT (Jason Web Token)
            access_token = JwtService.sign({_id: result._id , role: result.role})
            
            refresh_token = JwtService.sign({_id: result._id , role: result.role},'1y' , REFRESH_SECRET)

            // database whitleist

            await RefreshToken.create({token: refresh_token})

        } catch(err){
            return next(err)
        }
        res.json({access_token , refresh_token})
    }
}

export default registerController;