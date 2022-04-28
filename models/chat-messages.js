

class Mensaje{
  constructor(uid,name,message,fecha){
    this.uid = uid;
    this.name = name;
    this.message = message;
    this.fecha=fecha;
  }
}


class ChatMessages {
  constructor(){
    this.mensajes=[];
    this.usuarios={};
  }
  get ultimos10(){
    this.mensajes=this.mensajes.splice(0,10);
    return this.mensajes;
  }
  get usuariosArr(){
    return Object.values(this.usuarios);
  }
  enviarMensaje(uid,name,message, fecha=new Date().toLocaleString('en-ES', {
    timeZone: 'America/Bogota'})){
    this.mensajes.unshift(
      new Mensaje(uid,name,message,fecha)
    );
  }
  conectUser(user){
    this.usuarios[user.id]=user;
  }
  desconectarUsuario(id) {
    delete this.usuarios[id];
  }
}
module.exports =ChatMessages;