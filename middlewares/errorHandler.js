import { DEBUG_MODE } from '../config';
import { ValidationError } from 'joi';
import CustomeErrorHandler from '../services/CustomeErrorHandler';

let data;
const errorHandler = (err, req, res , next) => {
    let statusCode = 500;
     data = {
        message : "Internal Server Error",
        ...(DEBUG_MODE === 'true' && { originalError : err.message})
    }
    // console.log(data)
    // for regex validation
    if(err instanceof ValidationError) {
        statusCode = 422;
        data = { 
            message : err.message
        }
    }

    // to cehck custom error
    if(err instanceof CustomeErrorHandler) {
        statusCode = err.status;
        data = { 
            message : err.message
        }
    }
    return res.status(statusCode).json(data)
}

export default errorHandler;