import mongoose from 'mongoose';

const Schema = mongoose.Schema

const refreshTokenSchema = new Schema({
    token : {type: String , unique : true },
    // role : {type : String , default:'customer'},
 } , { timestamps : false});

 export default mongoose.model('RefreshToken' , refreshTokenSchema , 'refreshTokens')
