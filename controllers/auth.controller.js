const { response } = require("express");
const Usuario=require("../models/user");
const bcryptjs=require("bcryptjs");
const { generarJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login=async(req,res=response)=>{
  const {email,password}=req.body;

  try {
    // verificar si el correo existe
    const user=await Usuario.findOne({ email});

    if(!user){
      return res.status(400).json({msg: 'Usuario no existe'})
    }

    // verificar si el usaurio esta activo
    if(!user.status){
      return res.status(400).json({msg: 'Este usuario esta inactivo'})
    }

    // verificar la contraseña
    const validPassword=bcryptjs.compareSync(password, user.password);

    if(!validPassword){
      return res.status(400).json({
        msg: 'Contraseña erronea'
      })
    }
    // generar el JWT
    const token=await generarJWT(user.id);
    res.json({user,token})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: 'Hubo un error al loguearse'})
  }
  
}

const googleSignin = async(req, res=response) => {
  const {id_token}=req.body;

  try {
    const {name,email,img} = await googleVerify(id_token);

    let usuario=await Usuario.findOne({email})

    if (!usuario) {
      console.log("Usurio no econtrado")
      // crear en la bd
      const data={
        name,
        email,
        password:'kakaroto', 
        img,
        google:true
      };
      usuario=new Usuario(data);
      await usuario.save();
    }
    // si el usario en db
    if(!usuario.status){
      return res.status(401).json({msg: 'Hable con el admin, usuario bloqueado'})
    }
    // generar el jtw
    const token=await generarJWT(usuario.id);


    res.json({id_token,usuario,token})
  } catch (error) {
    res.status(400).json({msg: "El token e google no es valido."})
  }

}

module.exports = {login,googleSignin};