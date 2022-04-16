const {Schema,model}=require('mongoose')

const MensajeSchema=Schema({
  name:{
    type:String,
    required:[true,"El nombre es obligatorio"],
  },
  message:{
    type: String,
    required:true,
  }
});

MensajeSchema.methods.toJSON=function(){
  const {__v,_id,...mensaje}=this.toObject();
  mensaje.uid=_id;
  return mensaje
}

module.exports =model('Mensaje',MensajeSchema)