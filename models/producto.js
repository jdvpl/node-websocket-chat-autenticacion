const {Schema,model}=require('mongoose')

const ProductoSchema=Schema({
  name:{
    type:String,
    required:[true,"El nombre es obligatorio"],
  },
  status:{
    type:Boolean,
    default:true,
    required:true,
  },
  category:{
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required:true,
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  },
  price:{
    type: Number,
    required:true,
    default:0,
  },
  description:{
    type: String,
    required:true,
  },
  available:{
    type: Boolean,
    default:true,
  },
  quantity:{
    type: Number,
    default:0,
  },
  discount:{
    type: Number,
    default:0,
  },
  colors:{
    type: Array,
    required:true,
  },
  sizes:{
    type: Array,
    required:true,
  },
  img:{
    type: String
  }
});

ProductoSchema.methods.toJSON=function(){
  const {__v,status,_id,...produto}=this.toObject();
  produto.uid=_id;
  return produto
}

module.exports =model('Producto',ProductoSchema)