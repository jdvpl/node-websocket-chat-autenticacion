const {response}=require('express')
const bcrypt=require('bcryptjs')
const User= require('../models/user');

const userGet=async(req, res=response) => {

  const estado={status:true}
  const {limite=5, desde=0}=req.query;


  const [total,usuarios]=await Promise.all([
    User.countDocuments(estado),
    User.find(estado)
      .skip(Number(desde))
      .limit(Number(limite))
  ])
  res.json({total,limite,desde,usuarios});
}

const userPut=async(req, res=response) => {
  const id=req.params.id;
  const {_id,password,google,email, ...resto}=req.body;
  //  validar con la base de datos

  if(password){
    const salt=bcrypt.genSaltSync();
    resto.password=bcrypt.hashSync(password,salt);
  }

  const usuario=await User.findByIdAndUpdate(id, resto)
  res.json(
    usuario
    );
}
const userPost=async(req, res) => {

  
  const {name,email,role,password}=req.body;
  const user=new User({name,email,role,password})
  // encriptar la contraseña
  // generar un una encriptacion de 10 caracteres
  const salt=bcrypt.genSaltSync();
  user.password=bcrypt.hashSync(password,salt);
  // guardar en la base de datos
  await user.save()
  res.json(user);
}
const userDelete=async(req, res) => {
  const {id} = req.params


  // /boarrar fisicamente no recomendable
  // const usuario =await User.findByIdAndDelete(id)
  const usuario =await User.findByIdAndUpdate(id,{ status:false})

  res.json(
    usuario
    );
}


module.exports ={
  userGet,
  userPut,
  userPost,
  userDelete
}