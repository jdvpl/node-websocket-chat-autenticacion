const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const {ChatMessages}=require("../models");


const chatMessages=new ChatMessages();


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
  
  socket.on('disconnect',()=>{
    chatMessages.desconectarUsuario(user.id);
    io.emit('usuarios-activos',chatMessages.usuariosArr);

  })

  socket.on('enviar-mensaje',({uid,mensaje})=>{
    chatMessages.enviarMensaje(user.id,user.name,mensaje);
    io.emit('recibir-mensajes',chatMessages.ultimos10)
  })

}

module.exports={
  socketController
}