import  Express  from "express";
let bachelor_router  = Express.Router()
import { todoModel , bachelorCave } from "../databse/models";
import { failureServiceResponse, successServiceResponse } from "../service_response/service_response"; 

let cities = [
   'Adilabad',
   'Anantapur',
   'Chittoor',
   'Kakinada',
   'Guntur',
   'Hyderabad',
   'Karimnagar',
   'Khammam',
   'Krishna',
   'Kurnool',
   'Mahbubnagar',
   'Medak',
   'Nalgonda',
   'Nizamabad',
   'Ongole',
   'Hyderabad',
   'Srikakulam',
   'Nellore',
   'Visakhapatnam',
   'Vizianagaram',
   'Warangal',
   'Eluru',
   'Kadapa',
   'noida',
   'kolkata',
   "chandigarh"
]
 


bachelor_router.post('/bachelor-cave' ,  async (req,res)=>{
   try{
     
    let bachelor_body = req.body
     if(typeof bachelor_body=="object" && Object.keys(bachelor_body).length>0  ) { 
      for(let val in bachelor_body ) {
         if(Object.keys(bachelor_body[val]).length==0) {
           return res.send(failureServiceResponse(500,  `please provide "${val}"` ) )
         }
       }
     }else{
      return res.send(failureServiceResponse(500,  "please provide valid object " ) )
     }
    
     
          let dt =  new bachelorCave(bachelor_body)
         let saved = await  dt.save()
    
   
     return  res.send(successServiceResponse( 200 , dt, ' message saved '))
   
   }catch(err){ 
      return res.send(failureServiceResponse(500,  err) )
   }
    
})



bachelor_router.get('/bachelor-list' ,  async (req,res)=>{
   try{
     
    let dt = await   bachelorCave.find()
    
    res.send(successServiceResponse( 200 , dt, ' message saved '))
   
   }catch(err){ 
      res.send(failureServiceResponse(500,  err) )
   }
    
})







bachelor_router.get('/bachelor-search' ,  async (req,res)=>{
   try{
    
       const {city} = req.query 
   
      
         if(Object.keys(req.query).length==0) {
             return res.send(failureServiceResponse(500, ` please provide atleast "city" `) )
         }else{
        let matched_dresult = await   bachelorCave.aggregate([
    
         //   {$project:{ "Locality details" :1 }}
         //   ,      

            { 
            $match: { "Locality details.City" :{$regex:".*"+city+".*" , $options:"i" } }     
           },
        ])

     if(matched_dresult.length>0){
       return res.send(successServiceResponse( 200 , matched_dresult, ` ${city}_serch_result ` ))
    }else{
      return res.send(failureServiceResponse(500,  " no search result found ") )
    }

             
         }
   
   
   }catch(err){ 
      return res.send(failureServiceResponse(500,  err) )
   }
    
})




 export default bachelor_router