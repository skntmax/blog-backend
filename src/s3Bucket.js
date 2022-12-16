 import AWS from 'aws-sdk'
import config from './config'
var s3 ;
 
 function init(){

    s3 = new AWS.S3({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey ,
        region: config.region
    });

     
//    s3.listObjects({Bucket: config.bucketName }, function (err, data) { 
//      if(err)throw new Error(err)
//      let all_files = []
//       console.log("data.Contents" , data.Contents );  
//       })

    }

export default init
export {s3}