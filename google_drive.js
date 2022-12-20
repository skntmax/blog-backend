import fs from 'fs'
import {google} from 'googleapis'
import google_key from './google_key.js'
 
let SCOPES =  ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
   keyFile:JSON.stringify( google_key) ,
   scopes:SCOPES
})


createAndUploadFile(auth)

 function createAndUploadFile(auth) {
    try{
       


  let driverService = google.drive({ version:'v3' ,auth})
   let fileMeta = {
     name:"package.json" ,
     parents:['1DaWS1fqNObD3HCqz86g8KN6YV8kTxJWL']
   }    

   let media = {
    mimeType:"image/png" ,
    body:'package.json'   
   }
     
   let response =   driverService.files.create({
      resource:fileMeta ,
      media:media ,
      fields:'id'
   })

     console.log(response.status);
   switch(response.status) {

    case 200 :
          // console.log(res.data.id);
    default : 
          console.log(" default id ");
         }
      }

      catch(err){
             console.log("err" ,err);
       }
}

