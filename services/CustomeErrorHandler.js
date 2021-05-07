class CustomeErrorHandler extends Error {
    // at the time of object creation constructor will automaticaly call
    constructor(status,msg) {
        super()
        this.status = status;
        this.message = msg;
    }

    // we dont need to create object of static method 
    static alreadyExist(message) {
        return new CustomeErrorHandler(409 , message)
    }

    //if wrong credentials
    static wrongCredentials(message = 'Username or Password is Wrong!') {
        return new CustomeErrorHandler(401 , message)
    }
    
    //unauthorized
    static unAuthorized(message = 'unAuthorized sorry!') {
        return new CustomeErrorHandler(401 , message)
    }
    // not found
    static notFound(message = '404 not found!') {
        return new CustomeErrorHandler(404 , message)
    }

   
}

export default CustomeErrorHandler