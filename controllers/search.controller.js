const { response } = require("express");
const { User, Categoria, Producto } = require("../models");
const {ObjectId}=require("mongoose").Types
const collectionsAvailable=[
  'categorias',
  'productos',
  'roles',
  'users',
]


const buscarUsuarios = async(termino="", res=response) => {
  const esMongoId=ObjectId.isValid(termino)// retorna verdadero si es un mondo id

  if(esMongoId){
    const user = await User.findById(termino)
    return res.status(200).json({
      results: (user)?[user] :[]
    })
  }

  const regex=new RegExp(termino, 'i');

  const [users,total]=await Promise.all([
    User.find({
      $or:[
        {name:regex},
        {email:regex},
      ],
      $and:[{status:true}]
    }),
    User.count({
      $or:[
        {name:regex},
        {email:regex},
      ],
      $and:[{status:true}]
    }),
  ])

  
  return res.status(200).json({
    total,
    results: users
  })

}
const buscarCategorias = async(termino="", res=response) => {
  const esMongoId=ObjectId.isValid(termino)// retorna verdadero si es un mondo id
  if(esMongoId){
    const categoria = await Categoria.findById(termino)
    return res.status(200).json({
      results: (categoria)?[categoria] :[]
    })
  }
  const regex=new RegExp(termino, 'i');
  const [categories,total]=await Promise.all([
    Categoria.find({
      $or:[
        {name:regex},
      ],
      $and:[{status:true}]
    }),
    Categoria.count({
      $or:[
        {name:regex},
      ],
      $and:[{status:true}]
    }),
  ])
  return res.status(200).json({
    total,
    results: categories
  })

}
const buscarProductos = async(termino="", res=response) => {
  const esMongoId=ObjectId.isValid(termino)// retorna verdadero si es un mondo id
  if(esMongoId){
    const producto = await Producto.findById(termino).populate('category',['name'])
    return res.status(200).json({
      results: (producto)?[producto] :[]
    })
  }
  const regex=new RegExp(termino, 'i');
  const [products,total]=await Promise.all([
    Producto.find({
      $or:[
        {name:regex},
        {description:regex},
      ],
      $and:[{status:true}]
    }).populate('category',['name']),
    Producto.count({
      $or:[
        {name:regex},
        {description:regex},
      ],
      $and:[{status:true}]
    }).populate('category',['name']),
  ])
  return res.status(200).json({
    total,
    results: products
  })

}


const buscar=async(req,res=response)=>{
  const {collection,termino}=req.params;

  if(!collectionsAvailable.includes(collection)){
    return res.status(401).json({ msg: `La conecciones permitidas son ${collectionsAvailable}`})
  }

  switch (collection) {
    case 'categorias':
    buscarCategorias(termino,res)
      break;

    case 'productos':
      buscarProductos(termino,res)
      break;

    case 'users':
      buscarUsuarios(termino,res)
      break;
    default:
        res.status(404).json({msg: `Esta busqueda no esta permitida`})
      break;
  }

}

const searProdutByCategory = async(req, res=response) => {
  const {id}=req.params;

  const [products,total]=await Promise.all([
    Producto.find({
      $or:[
        {category:id},
      ],
      $and:[{status:true}]
    }).populate('category',['name']),
    Producto.count({
      $or:[
        {category:id},
      ],
      $and:[{status:true}]
    }).populate('category',['name']),
  ])
  return res.status(200).json({
    total,
    results: products
  })

  
}

module.exports ={buscar,searProdutByCategory}