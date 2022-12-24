import express from 'express'
import { blogsModel ,userModel } from './../databse/models'
import { upload } from './../databse/multer/mult'
import fs, { createReadStream, unlink, unlinkSync } from 'fs'
import {fileURLToPath} from 'url';
import path from 'path';
import {s3} from './../s3Bucket'
import { uploadToGoogleDrive  , authenticateGoogle } from './../google_drive' 
import bcrypt from "bcrypt";
import { successServiceResponse , failureServiceResponse } from '../service_response/service_response';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import config from './../config';

let authRouter = express.Router()
 
     
authRouter.get('/login', async (req, res) => {
    const { username , email , password } = req.body
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/         
      console.log("list", list);
       
})


authRouter.get('/test', async (req, res) => {
  let existingUser = await userModel.findOne({
    email:'skntsdjee@gmail.com'
  }) 
     

  console.log(existingUser);
})




     
authRouter.post('/signup', async (req, res) => {
   
     const { username, email , password ,adminPassword } = req.body

     try{
      let hashPass = await bcrypt.hash(password,5)
      if(hashPass) {
            let existingUser = await userModel.findOne({
              email:email
            }) 
             if(existingUser==null) {
              let userCreated = await userModel.insertMany([{
                username:username,
                email:email,
                password:hashPass,
                isAdmin:adminPassword==undefined?false:adminPassword=='temp'?true:false
            }])
              if(userCreated) {
                res.send(successServiceResponse(200,userCreated[0] ,"Account created "))
              }
            }else{
                res.send(failureServiceResponse(500,"user is already registered "))
             }

          
               
  
         }
     }catch(err){
          res.send(failureServiceResponse(500, err ))
     }
      
 
})


 




export default authRouter