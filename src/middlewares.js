import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from  './routes'
import authRouter from './auth/auth'
import path from 'path' 
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser'
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);


var corsOptions = {
        optionsSuccessStatus: 200 ,// some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials:true ,
        origin:true
      }
       
const middlewares =(app)=>{
     app.use(cookieParser())
    app.use(cors(corsOptions))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static(path.join( __dirname,"../my-uploads/") ))
    app.use('/user',router)
    app.use('/auth',authRouter)
  }

export {middlewares}