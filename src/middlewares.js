import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from  './routes'
 
var corsOptions = {
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      }

const middlewares =(app)=>{  
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use('/user',router)
    app.use(express.static('./../my-uploads/'))
}

export {middlewares}