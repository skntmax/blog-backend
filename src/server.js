import * as dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import express from 'express'
import {middlewares} from './middlewares'
import { conn } from './databse/connection'
import cors from 'cors'
import s3bucketInit from './s3Bucket'
import { __dirname } from './middlewares'
let app = express() 
let port  = process.env.PORT 

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// ----------------middlewares ---------------
middlewares(app)
// ----------------middlewares ---------------
 

// ----------------s3Bucket ---------------
s3bucketInit()
// ----------------s3Bucket ---------------


app.get( '/'  , (req,res)=> {      
     console.log(" home page " , req.body );
})
 

app.get( '/read-xml'  , (req,res)=> { 
           
     var parser = new xml2js.Parser();
     fs.readFile(__dirname + '/../public/sitemap.xml', function(err, data) {
         if (!err) {
             console.log(JSON.stringify(data));
         }
     });
})


app.listen(port,()=>{
         console.log(" server connected at  "+port );
})