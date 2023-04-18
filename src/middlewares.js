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
    app.use(express.static( path.join( __dirname,"../my-uploads/") ) )
   
    app.use(session({
      secret: 'keyboard cat',
      resave: false ,
      saveUninitialized : true ,
      cookie: { secure: true }
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(new LocalStrategy(
      function(email, password, done) {
        console.log(email , password)
        userModel.findOne({ email: email } , function (err, user)  {
           console.log('====================================');
           console.log(user);
           console.log('====================================');
          if (err) { return done(err); }
          if (!user) { return done(null, false ,  " user does not exist "); }
          if (!bcrypt.compare(password , user.password)) { return done( null, false , "incorent password "); }
          return done(null, user) ;
           });
         }
     )) ;

     app.use('/user',router )
     app.use('/auth',authRouter)
     app.use('/passport',passportRouter)    
  }

  
passport.serializeUser((user, done )=>{      
     if(user) {
       return done(null, user.email  )
     }
    return done(null ,false )
})


passport.deserializeUser((user, done )=>{     
   user.findOne({email:user.email} , (err, user)=>{
    if(err) return done(null ,false )
   return done(null , user)
   })
})


export {middlewares}


// done(null, user) ;
// arg1 : error 
// arg2 : data ,
// arg3 : message 
