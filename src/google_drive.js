import fs from 'fs'
import path from 'path'
import {google} from 'googleapis'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// let SCOPES =  ['https://www.googleapis.com/auth/drive']


export const authenticateGoogle = () => {
   const auth = new google.auth.GoogleAuth({
     keyFile: `${__dirname}/google_key.JSON`,
     scopes: "https://www.googleapis.com/auth/drive",
   });
   return auth;
 };
 
export  const uploadToGoogleDrive = async (file, auth) => {
   const fileMetadata = {
     name: file.originalname,
     parents: ["1DaWS1fqNObD3HCqz86g8KN6YV8kTxJWL"], // Change it according to your desired parent folder id
   };
 
   const media = {
     mimeType: file.mimetype,
     body: fs.createReadStream(file.path),
   };
 
   const driveService = google.drive({ version: "v3", auth });
 
   const response = await driveService.files.create({
     requestBody: fileMetadata,
     media: media,
     fields: "id",
   });
   return response;
 };


// const auth = new google.auth.GoogleAuth({
//    keyFile:JSON.stringify( google_key) ,
//    scopes:SCOPES
// })


// createAndUploadFile(auth)

//  function createAndUploadFile(auth) {
//     try{
       


//   let driverService = google.drive({ version:'v3' ,auth})
//    let fileMeta = {
//      name:"package.json" ,
//      parents:['1DaWS1fqNObD3HCqz86g8KN6YV8kTxJWL']
//    }    

//    let media = {
//     mimeType:"image/png" ,
//     body:'package.json'   
//    }
     
//    let response =   driverService.files.create({
//       resource:fileMeta ,
//       media:media ,
//       fields:'id'
//    })

//      console.log(response.status);
//    switch(response.status) {

//     case 200 :
//           // console.log(res.data.id);
//     default : 
//           console.log(" default id ");
//          }
//       }

//       catch(err){
//              console.log("err" ,err);
//        }
// }




