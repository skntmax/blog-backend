let str = 'shasji kant kumar yadav '

let mySplit =(str)=>{     
     return function(seperator) {
        let sp=0 
        let ep=0 
        let res =[]
         for(val of str) {
           if(val!=seperator) { 
            sp++
           }else{
              ep=sp
               res.push(str.slice(sp,ep))
           }    
        }
    
        return res 
     }
    
  

  }

  console.log( mySplit(str)(''))