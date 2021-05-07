import Joi from 'joi';
import CustomeErrorHandler from '../../services/CustomeErrorHandler';
import JwtService from '../../services/JwtService'
import { User , RefreshToken } from '../../models'
import { REFRESH_SECRET } from '../../config'


const refreshController = {
    async refresh(req,res,next){
        const refreshSchema = Joi.object({
            refresh_token : Joi.string().required()
        })
        const { error } = refreshSchema.validate(req.body)

        if(error) {
            return next(error)
        }
        let refreshtoken;
        // database 
        try{    
           refreshtoken =  await RefreshToken.findOne({
                token : req.body.refresh_token
            })

            console.log(refreshtoken)
            if(!refreshtoken) {
                return next(CustomeErrorHandler.unAuthorized('Invalid refresh Token'))
            }

            let userId;

            try {
                const { _id } = await JwtService.verify(refreshtoken.token , REFRESH_SECRET)
                userId = _id
            } catch(err) {
                return next(CustomeErrorHandler.unAuthorized('Invalid refresh Token'))
            }

            // to verify in db

            const user = await User.findOne({
                _id: userId
            })
            if(!user){
                return next(CustomeErrorHandler.unAuthorized('No User Found!'))
            }

            // generate token
            // token generate
            const access_token = JwtService.sign({_id: user._id , role: user.role})
            
            const refresh_token = JwtService.sign({_id: user._id , role: user.role},'1y' , REFRESH_SECRET)

            // database whitleist
            await RefreshToken.create({token: refresh_token})

            res.json({access_token , refresh_token})

                    
        } catch(err){
            return next(new Error('Something went wrong'+ err.message))
        }
    }
}

export default refreshController;