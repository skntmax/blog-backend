import jwt  from "jsonwebtoken";
import config from "../config";
import { failureServiceResponse ,successServiceResponse } from "../service_response/service_response";
export const authMiddleware =async(req,res,next)=>{
 
    try {
  
        var authorization = req.headers['authorization'];
        if (authorization) {
            var tokenBearer = authorization.split(' ');
            var token = tokenBearer[1];
            jwt.verify( token , config.secretKey , function (err, decoded) {
                if (err) {
                     res.send(failureServiceResponse( 500 , "not a valid user "))
                 }
                else { 
                    req._id = decoded._id;
                    next();
                }
            });
        }
        else {
          res.send(failureServiceResponse(500,err))
        }

    } catch (err) {
        console.log(err)
    }
}

