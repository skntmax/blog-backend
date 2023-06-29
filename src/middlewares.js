import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from  './routes'
import authRouter from './auth/auth'
import path from 'path' 
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser'
import passport  from 'passport'
// let LocalStrategy = passport.LocalStrategy

import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from 'bcrypt'
import session from 'express-session'
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
import { userModel } from './databse/models'
import passportRouter from './passportjs/auth'
import { v4 as uuidv4 } from 'uuid';
import todo_router from './todo_router/router'

var corsOptions = {
        optionsSuccessStatus: 200 ,// some legacy browsers (IE11, various SmartTVs) choke on 204
        credentials:true ,
        origin:true
      }
      
 

const middlewares =(app)=>{
   
    //  app.use(cookieParser())
    //  app.use(cookieParser())
    app.use(cors(corsOptions))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static( path.join( __dirname,"../my-uploads/") ) )
     
    app.use(session({
      secret: 'keyboard cat',
      resave: false ,
      saveUninitialized : true ,
      cookie: { secure: false  , 
        maxAge:  60 * 1000
      },
    
    }))

    app.use(passport.initialize())
    app.use(passport.session())
     
  passport.use(new LocalStrategy(
      function( username , password , done ) {
        console.log(username , password )
        userModel.findOne({ email: username } , function (err, user)  {
          if (err) { return done(err) }
          if (!user) { return done( null, false ,  "user does not exist") }
          if (bcrypt.compare( password , user.password ,(err, data)=>{
            if(err){ return done( err); }
            if(!data) { return done(null, false , "incorent password " )}
            return done(null, user) ;
          })) 
           return done(null, false) ;
           });
         }
     )) ;

     app.use('/user',router )
     app.use('/auth',authRouter)
     app.use('/passport',passportRouter)    
     app.use('/todo',todo_router)    
          
passport.serializeUser(( user , done )=>{      
  if(user) {
      return done(null,  user.id )
    }
   return done(null ,false )
})


passport.deserializeUser((id , done )=>{     
 userModel.findById( id , ( err, user )=>{
   if(err) return done(null ,false )
    return done(null , user)
  })
})

    }



export {middlewares}


// done(null, user) ;
// arg1 : error 
// arg2 : data ,
// arg3 : message 
