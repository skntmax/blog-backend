import mongoose from 'mongoose'
import { Schema } from 'mongoose'

let ObjectId = mongoose.Schema.ObjectId;
 
let blogsModel =  mongoose.model('blog',Schema({
   blogOwner :{
      type:ObjectId,
      ref:'user',
      required:false
   } , 
   title:{
       type:String,
       required:true
    }
    ,
    disc:{
         type:String,
       required:true
    } ,
    image:{
         type:Array,
         required:false
    }  ,
    createdOn:{
       type:Date,
        default:()=> Date.now()
    }
}))
 


let userModel =  mongoose.model('user',Schema({
   
    username:{
      type:String,
      required:true
    }
   ,
   email:{
        type:String,
      required:true
   } ,
   password:{
        type:String,
        required:true
   } , 
   isAdmin:{
       type:Boolean,
    } ,
    createdOn:{
      type:Date,
       default:()=> Date.now()
     } ,
     modifiedOn:{
      type:Date
     }
 
}))




let todoModel =  mongoose.model('todo',Schema({
 
   title:{
     type:String,
     required:true
    },
   discription:{
      type:String,
      required:true     
   }
  

}))









export { blogsModel , userModel , todoModel }   