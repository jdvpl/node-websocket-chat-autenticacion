const { response } = require("express");


const isFileUploaded=(req,res=response,next)=>{

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(401).json({msg: 'No hay archivos para subir.'});
  }
  next();
}


module.exports ={
  isFileUploaded
}