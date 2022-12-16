import multer from 'multer'
 
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
       cb(null, 'my-uploads')
    },
    filename: function ( req, file, cb ) {
       const ext = file.mimetype.split("/")[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+"."+ext
      cb( null , file.fieldname + '-' + uniqueSuffix )
    }
  })

  const upload = multer({ storage: storage })

export {upload}


