import  Express  from "express";
import passport from 'passport'
let passportRouter  = Express.Router()


 passportRouter.post('/login' ,passport.authenticate('local'), (req,res)=>{
    
  res.send({
         message: " send "
    }) 
 })


//  passportRouter.post('/login',  passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
    
//     res.redirect('/');
//   });


 export default passportRouter