import  Express  from "express";
let bachelor_router  = Express.Router()
import { todoModel , bachelorCave } from "../databse/models";
import { failureServiceResponse, successServiceResponse } from "../service_response/service_response"; 




bachelor_router.post('/bachelor-cave' ,  async (req,res)=>{
    
   try{
        
   let bachelor_body = req.body
   let dt =  new bachelorCave(bachelor_body)

    let saved = await  dt.save()
    res.send(successServiceResponse( 200 , dt, ' message saved '))
   
    
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