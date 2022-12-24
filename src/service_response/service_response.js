export const successServiceResponse=(status, result,message)=>{
    return {
        status:status,
        result :result,
        message:message
      }
}

export const failureServiceResponse=(status, err)=>{
 
    return {
        status:status,
        message :err
      }
}
