const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const {ChatMessages}=require("../models");


const chatMessages=new ChatMessages();

const fecha =new Date().toLocaleString('en-ES', {timeZone: 'America/Bogota'})
const socketController=async(socket=new Socket(),io)=>{
  const token=socket.handshake.headers['x-token'];

  const user= await comprobarJWT(token); 

  if(!user) {
    return socket.disconnect();
  }

  // /agrega el suario conectado
  chatMessages.conectUser(user);

  io.emit('usuarios-activos',chatMessages.usuariosArr);
  socket.emit('recibir-mensajes',chatMessages.ultimos10);

  // conectarlar a una sala especial
  socket.join(user.id);
  
  socket.on('disconnect',()=>{
    chatMessages.desconectarUsuario(user.id);
    io.emit('usuarios-activos',chatMessages.usuariosArr);

  })

  socket.on('enviar-mensaje',({uid,mensaje})=>{

    if(uid){
      // mensaje privado
      let mensajePrivado={name: user.name,mensaje,fecha,uid};
      socket.to(uid).emit('mensaje-privado',mensajePrivado);
      socket.emit('mensaje-privado',mensajePrivado);

    }else{
      chatMessages.enviarMensaje(user.id,user.name,mensaje);
      io.emit('recibir-mensajes',chatMessages.ultimos10)
    }
  })

}

module.exports={
  socketController
}