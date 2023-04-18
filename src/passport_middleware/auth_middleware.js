
 export const passportMiddleware  =  (req, res, done)=>{  
     
    if(res.user)
      {
        return done(null, false ," user not logged in ")
      }
      return done(null, req.user)
       
  }