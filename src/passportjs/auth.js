import  Express  from "express";
import passport from 'passport'
let passportRouter  = Express.Router()

import { passportMiddleware } from "../passport_middleware/auth_middleware.js";


 passportRouter.post('/login' , passport.authenticate('local') ,  (req,res)=>{
    console.log(req.body);
    req.session.test? ++req.session.test:req.session.test=1
   //  console.log(" logged in " , req.session );
     res.send({
         id:req.user._id
    }) 
 })


 passportRouter.get('/login' , (req,res)=>{

   res.render('login')
 })


 passportRouter.get('/getUserBlogs' , passportMiddleware ,  (req,res)=>{
    console.log(" passportMiddleware " ,  req.cookies  );
     if(req.user) {
        return res.send(req.user) 
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