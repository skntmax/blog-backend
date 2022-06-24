
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

module.exports  = {

    awsConfig: ()=>{
        AWS.config.update({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_KEY
          })    
    } ,
    name: ()=>{
         console.log("my name ");
    }   
}