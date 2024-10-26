import { APIError } from "./ApiError.js";

export class APIResponse {
     localDateTime
     data
     apiError 

    constructor(data , apiError) {
        this.localDateTime = new Date().toISOString(); 

        if (data) {   //agar data mil jata hai to me apiError null hoga
            this.data = data;
            this.apiError = null;
        } else if (apiError) {   // agar api error hai to ye data ko null kar dega
            this.apiError = apiError;
            this.data = null; 
        } else {
            this.apiError = null;  //
        }
    }
}
