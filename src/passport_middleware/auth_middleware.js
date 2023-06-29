
 export const passportMiddleware  =  (req, res, done)=>{  
   
      if(res.user)
      {
        return done(null, req.user ,"  user found ")
      }
       
      return done(null, false )
       
  }