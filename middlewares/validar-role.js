const { response } = require("express")


const esAdminRole=(req,res=response,next)=>{
  if(!req.user){
    return res.status(500).json({ msg: 'Se quiere verificar role sin validar el token primero'})
  }

  const{role,name}=req.user;
  if(role !=="ADMIN_ROLE"){
    return res.status(401).json({msg: `${name} no tiene permiso no es administrador`})
  }
  next();
}


const tieneRole=(...roles)=>{
  
  return(req, res=response,next)=>{
    if(!req.user){
      return res.status(500).json({ msg: 'Se quiere verificar role sin validar el token primero'})
    }

    if(!roles.includes(req.user.role)){
      return res.status(401).json({ msg: `Este usuario no tiene uno de estos roles para eliminar al usuario ${roles}`})
    }
    next();
  }
}

module.exports ={esAdminRole,tieneRole}