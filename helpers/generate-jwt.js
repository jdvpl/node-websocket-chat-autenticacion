const jwt = require("jsonwebtoken");
const { User } = require("../models");


const generarJWT=(uid='')=>{
  return new Promise((resolve,reject)=>{
    const payload= {uid};
    jwt.sign(payload,process.env.SECRETORPUBLICKEY, {
      expiresIn: '4h'
    },( err, token) =>{
      if (err){
        console.log(err);
        reject('No se pudo generar el token')
      }else{
        resolve(token);
      }
    })
  })
}


const comprobarJWT=async(token='')=>{
  try {
    if(token.length<=10){
      return null;
    }

    const {uid}=jwt.verify(token,process.env.SECRETORPUBLICKEY);
    const user=await User.findById(uid);

    if(user){
      if(user.status){
        return user;
      }else{
        return null;
      }
    }else{
      return null;
    }



  } catch (error) {
    return null;
  }
}

module.exports={generarJWT,comprobarJWT}