const express = require('express')
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const app = express()
const awsConfig =  require('./configuration/aws_config')
 awsConfig.awsConfig();
 var s3 = new AWS.S3();

 
 app.get('/upload' , (req,res)=> {
    
   var filePath = "./package.json"; 
    //configuring parameters

     var params = {
      Bucket: 'demo-shashi',
      Body : fs.createReadStream(filePath),
      Key : "folder/"+Date.now()+"_"+path.basename(filePath)
    };
    
    s3.upload(params, function (err, data) {
      
      if (err) {
        console.log("Error", err);
      }
       
      if (data) {
        console.log("Uploaded in:", data.Location);
      }
       
    });
   

    
    

 })




app.get('/bucket/file/list' , (req,res)=>{
    // let params = { 
    //     Bucket: 'demo-shashi',
    //     // Delimiter: '',
    //     // Prefix: 's/5469b2f5b4292d22522e84e0/ms.files' 
    //   }

    s3.listObjects({Bucket: 'demo-shashi'}, function (err, data) {
        if(err)throw err;
           
        let all_files = []  
         data.Contents.map((ele)=>{
            all_files.push(ele.Key);
        })
         res.send(all_files) 
         
         });
})


 app.listen(9000, ()=>{
     console.log("server started at 9000 ");
 } , )