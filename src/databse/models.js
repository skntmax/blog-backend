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




export {blogsModel}