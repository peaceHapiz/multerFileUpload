var express = require('express');
var cors = require('cors');
var multer  = require("multer")
require('dotenv').config()

var app = express();

app.use(cors());
app.use(express.json())
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.diskStorage({
  filename : (req,file,cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
  destination : (req,file,cb) => {
    cb(null, `uploads/`)
  }
})

const upload =  multer({
  storage : storage,
})



app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('file'),(req,res)=> {
  if(!req.file){
    return res.status(400).json({error : "no file uploaded"})
  }


  const {originalname, mimetype , size }= req.file

   res.json({
    
      name : originalname,
      type : mimetype,
      size : size
    
   })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
