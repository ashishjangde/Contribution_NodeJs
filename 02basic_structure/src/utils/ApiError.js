export class APIError {
     status
     message
     subErrors

    constructor(status , message , subErrors ) {
        this.status = status;  // status 200 , 400 , 500
        this.message = message;  //  message  => error
        this.subErrors = subErrors;  // sub error
    }
}

