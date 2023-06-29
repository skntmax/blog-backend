import  Express  from "express";
let todo_router  = Express.Router()
import { todoModel } from "../databse/models";
import { failureServiceResponse, successServiceResponse } from "../service_response/service_response"; 

todo_router.get('/todo-list' , async  (req,res)=>{

   //   let new_todo = new todoModel({ title:"sample"+Math.floor(Math.random()*100) ,  discription:"disc"+Math.floor(Math.random()*100) })
   //   await new_todo.save()
     let all_todo = await todoModel.find()
     res.send(successServiceResponse(200,all_todo, " updated list" ) )
    
 })








 todo_router.post('/add-todo-list' , async  (req,res)=>{
    
   try{
        
      const { title , discription }  = req.body
      let new_todo = new todoModel({ title,  discription })
       new_todo.save().then(()=>{
          res.send(successServiceResponse(200,new_todo," deleted" ))
      
          })

       
   }catch(err){ 
      res.send(failureServiceResponse(500,  err) )
   }

  
})


 todo_router.post('/remove-todo-list' , async  (req,res)=>{
    
   try{
        
    const {_id}  = req.body 
    let remove_todo = await todoModel.deleteOne({_id:_id})
    let all_todo = await todoModel.find({})
      res.send(successServiceResponse(200,all_todo, " deleted" ))
       
   }catch(err){ 
      res.send(failureServiceResponse(500,  err) )
   }

  
})




 export default todo_router