import  Express  from "express";
let bachelor_router  = Express.Router()
import { todoModel , bachelorCave } from "../databse/models";
import { failureServiceResponse, successServiceResponse } from "../service_response/service_response"; 




bachelor_router.post('/bachelor-cave' ,  (req,res)=>{
    
   try{
        
   let bachelor_body = req.body
   let dt =  new bachelorCave(bachelor_body)
   dt.save().then(()=>{
     console.log("saved data ");
   }).cathc(err=>{
     console.log("err" , err );
   })
   
   req.send(successServiceResponse( 200 , dt, ' message saved '))
    
   }catch(err){ 
      res.send(failureServiceResponse(500,  err) )
   }

  
})




bachelor_router.post('/test' ,  (req,res)=>{
    
   res.send({
     msg:"hi"
   })
   
 })



 export default bachelor_router