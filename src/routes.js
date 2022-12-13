import express from 'express'
import { blogsModel } from './databse/models'
import { upload } from './databse/multer/mult'
import fs from 'fs'
import {fileURLToPath} from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



let router = express.Router()
 
let objectId = blogsModel.objectId

router.get('/login', async (req, res) => {
      let list = await blogsModel.find({})
      console.log("list", list);
})


router.post('/post', async (req, res) => {
      let { title, disc } = req.body
      let insertBlog = await blogsModel.insertMany([{
            title: title,
            disc: disc
      }])
      res.status(200).send({
            status: 200,
            result: { _id: insertBlog[0]._id }
      }) 
  })


  

router.post('/image', upload.single('file'), async(req, res) => {
      const {fieldname,originalname,encoding,mimetype,destination,filename,path,size, } = req.file
      const {id} = req.body 
       
      try { 
            console.log('====================================');
            console.log(" file saved id ", id  );
            console.log(' ====================================');
            let update = {image:[req.file.originalname, req.file.filename ] };

                blogsModel.findByIdAndUpdate( id , update,(err,data)=>{
                   if(err) throw new Error(err)
                   console.log("updated " , data );

                   res.status(200).send({
                        status: 200,
                        result: " file saved succesfully  "
                       })         
            } )
       }catch (err) {
            res.status(500).send({
                  status: 500,
                  result: "some erro ouccured " + err
            })
      }

})



router.get('/files', (req,res)=>{

let testFolder = path.join( __dirname ,'../my-uploads/')
fs.readdir(testFolder, (err, files) => {
   res.send(files)
      
});

})




export default router