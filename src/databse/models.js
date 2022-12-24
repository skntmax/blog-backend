import mongoose from 'mongoose'
import { Schema } from 'mongoose'

let blogsModel =  mongoose.model('blog',Schema({
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
    }
 
}))








export { blogsModel , userModel }