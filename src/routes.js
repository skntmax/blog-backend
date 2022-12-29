import express from 'express'
import { blogsModel ,userModel } from './databse/models'
import { upload } from './databse/multer/mult'
import fs, { createReadStream, unlink, unlinkSync } from 'fs'
import {fileURLToPath} from 'url';
import path from 'path';
import {s3} from './s3Bucket'
import { uploadToGoogleDrive  , authenticateGoogle } from './google_drive' 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fileUpload from 'express-fileupload'
import config from './config';

let router = express.Router()
 
let objectId = blogsModel.objectId

// router.use(fileUpload())
     
router.get('/login', async (req, res) => {
      let list = await blogsModel.find({})
      console.log("list", list);
})
 
router.post('/post', async (req, res) => {
      let { title, disc  , userEmail } = req.body
       let userExist =await userModel.findOne({email:userEmail})
       if(userExist!=null) {
            let insertBlog = await blogsModel.insertMany([{
                  title: title,
                  disc: disc,
                  blogOwner:userExist._id
            }])
            res.status(200).send({
                  status: 200,
                  result: { _id: insertBlog[0]._id }
            }) 
      }else{
            res.send({
                  status: 500,
                  message: "Unauthorized"
            }) 
      }
      
  })


  

// router.post('/image', upload.single('file') , async(req, res) => {
//       const {id} = req.body 
//       try { 
//             console.log('====================================');
//             console.log(" file saved id ", id  );
//             console.log(' ====================================');

//             let file = req.file
//             console.log(" req files " , req.file ); 
//              let extArray  = file.originalname.split('.')[1]
//              let ext =  extArray[extArray.length-1]   
//             let filName = new Date().getTime()+" "+file.originalname
//              let thumbnail = fs.createReadStream(file.path)
//              var params = {
//                 Bucket: config.bucketName,
//                 Body : thumbnail ,
//                 Key : "my-uploads/"+Date.now()+"_"+filName  
//                };
                 
//                s3.upload(params,async (err,data)=>{
//                 if (err) throw new Error(err)
//                 console.log("Uploaded in:", data.Location);
//                 let update = {image:[req.file.originalname, data.Location ] };
//                  await blogsModel.findByIdAndUpdate(id , update)
//                   unlinkSync(path.join(__dirname,'..', file.path ))
//                   res.status(200).send({
//                        status: 200,
//                        result: " file saved succesfully  "
//                       })         
//            } )
      
      
//       }catch (err) {
//             res.status(500).send({
//                   status: 500,
//                   result: "some erro ouccured " + err
//             })
//         }
//   })
















router.post('/image', upload.single('file') , async(req, res) => {
      const {id} = req.body 
      try { 
            console.log('====================================');
            console.log(" file saved id ", id  );
            console.log(' ====================================');
            if (!req.file) {
                  res.status(400).send("No file uploaded.");
                  return;
            }

            const auth = authenticateGoogle();
            const response = await uploadToGoogleDrive(req.file, auth);
            deleteFile(req.file.path);
            let update = {image:[req.file.originalname, `https://drive.google.com/uc?export=view&id=${response.data.id}` ] };
            await blogsModel.findByIdAndUpdate(id , update)
             
                 res.status(200).send({
                       status: 200,
                       result: " file saved succesfully  "
                      })    
                
      }catch (err) {
            res.status(500).send({
                  status: 500,
                  result: "some erro ouccured " + err
            })
        }
  })

   

router.post('/s3-upload',upload.single('file'), (req, res) => {
      try { 
             let file = req.file
        console.log(" req files " , req.file ); 
         let extArray  = file.originalname.split('.')[1]
         let ext =  extArray[extArray.length-1]   
        let filName = new Date().getTime()+" "+file.originalname
         let thumbnail = fs.createReadStream(file.path)
         var params = {
            Bucket: config.bucketName,
            Body : thumbnail ,
            Key : "my-uploads/"+Date.now()+"_"+path.basename(filName)  
           };
             
           s3.upload(params,(err,data)=>{
            if (err) throw new Error(err)
            console.log("Uploaded in:", data.Location);
                 fs.unlink('my-uploads/'+filName )
           })

       }catch (err) {
            res.status(500).send({
                  status: 500,
                  result: "some erro ouccured " + err
            })
      }

})







router.get('/get-blogs' ,async  (req,res)=>{
        
       try{
              let blogs =  await  blogsModel.find({})
               
               if(blogs) {
                    res.status(200).send({
                        status: 200,
                        result: blogs                       }) 
                 }
             
        } catch(err) {
            res.status(500).send({
                  status: 500,
                  result: "some erro ouccured " + err
            })
             
        }

})




router.post('/update', async (req,res)=>{

    try{
       const {_id,disc}  = req.body
       let updated = await blogsModel.findByIdAndUpdate(_id ,{disc:disc})
       console.log(" updated blog " , updated) 
       if(updated){
            res.status(200).send({
                  status: 200,
                  result: updated }) 
          } 
        
    }catch(err){
      res.status(500).send({
            status: 500,
            result: "no updated  " + err
         })  
      }
      })


router.get('/files', (req,res)=>{
   let testFolder = path.join( __dirname ,'../my-uploads/')
   fs.readdir(testFolder, (err, files) => {
   res.send(files)    
  });

   
})


router.get('/upload-file', (req,res)=>{
      var filePath = "./package.json"; 
        //configuring parameters
     var params = {
      Bucket: 'demo-shashi',
      Body : fs.createReadStream(filePath),
      Key : "folder/"+Date.now()+"_"+path.basename(filePath)
      };

      s3.upload(params, function (err, data) {
      if (err) throw new Error(err)
        console.log("Uploaded in:", data.Location);  
      });
 })

 const deleteFile = (filePath) => {
      fs.unlink(filePath, () => {
        console.log("file deleted");
      });
    };

     
    
 router.post("/upload-file-to-google-drive", upload.single("file"),async (req, res, next)=>{
      try {
        if (!req.file) {
          res.status(400).send("No file uploaded.");
          return;
        }
        const auth = authenticateGoogle();
        const response = await uploadToGoogleDrive(req.file, auth);
        deleteFile(req.file.path);
        res.status(200).json({ response });
      } catch (err) {
        console.log(err); } 
    });









export default router