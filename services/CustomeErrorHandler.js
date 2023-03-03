class customeErrorHandler extends Error{
    constructor(status, msg){
        super();
        this.status = status;
        this.massage = msg;
    }

    static alreadyExist(massage){
        return new customeErrorHandler(409, massage);
    }

    static wrongCrendentials(massage = 'username and password maybe wrong'){
        return new customeErrorHandler(409, massage);
    }

    static unAuthorized(massage = 'unAuthorized.....>'){
        return new customeErrorHandler(409, massage);
    }

    static NotFound(massage = '404 Not Found'){
        return new customeErrorHandler(404, massage);
    }

    static serverError (massage = 'internal server error'){
        return new customeErrorHandler(500, massage);
    }
}

export default  customeErrorHandler;