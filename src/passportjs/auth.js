import  Express  from "express";
import passport from 'passport'
let passportRouter  = Express.Router()
import { passportMiddleware } from "../passport_middleware/auth_middleware.js";

 passportRouter.post('/login' , passport.authenticate('local') ,  (req,res)=>{
     
   req.session.test? ++req.session.test:req.session.test=1
    console.log(" logged in " , req.session );
     res.send({
         user:  
          {
             username:req.user.username ,
             sessions: req.session.test
          } 
    }) 
 })




 passportRouter.get('/getUserBlogs' , passportMiddleware ,  (req,res)=>{
   console.log('req.user' , req);  
     if( req.user ) {
        console.log('user logged in ' , req.user);  
        return res.send(req.passport.user) 
      } 
    res.send({
         user:"not logged in "  
    }) 


 })




//  passportRouter.post('/login',  passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
    
//     res.redirect('/');
//   });


 export default passportRouter