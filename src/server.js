import * as dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import express from 'express'
import {middlewares} from './middlewares'
import { conn } from './databse/connection'
import cors from 'cors'
import s3bucketInit from './s3Bucket'
import { __dirname } from './middlewares'
let app = express() 
let port  = process.env.PORT 


// ----------------middlewares ---------------
middlewares(app)
// ----------------middlewares ---------------
 


// ----------------s3Bucket ---------------
s3bucketInit()

// ----------------s3Bucket ---------------



app.get( '/'  , (req,res)=> {      
     console.log("home page " , req.body );
})


app.listen(port,()=>{
         console.log(" server connected at  "+port );
})