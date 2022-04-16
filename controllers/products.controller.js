const { response } = require("express")
const {Producto}=require("../models")


// obtener todas la categorias- paginacion-total y populate(relacion de quien la creo)
const getProducts=async(req, res=response) => {
  const {limite=5, desde=0}=req.query;
  const estado={status:true}
  const [total,productos]=await Promise.all([
    Producto.countDocuments(estado),
    Producto.find(estado)
      .populate('user',['name'])
      .populate('category',['name'])
      .skip(Number(desde))
      .limit(Number(limite))
  ])
  res.json({total,limite,desde, productos});
}
// obtener todas la categoria por id paginacion-total y populate(relacion de quien la creo)
const getProductById=async(req, res=response) => {
  const {id}=req.params;
  try {
    const producto=await Producto.findById(id).populate('user',["name","role"]).populate('category',['name']);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json(error)
  }
  
}


// crear Producto
const createProduct = async(req,res=response)=>{
  const {status,user,...body}=req.body;
  const {quantity,description,price,category,colors,sizes}=body;
  const name = req.body.name.toUpperCase();

  // generar la data al guardar
  const data={
    name,
    user: req.user._id,
    quantity,
    category,
    description,
    price,
    colors,
    sizes
  }
  try {
    const category=new Producto(data);
    await category.save();
    return  res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error)
  }
}
// actualizar categoria
const updateProduct=async(req, res=response) => {
  const {id}=req.params;
  const {status,user,...data}=req.body;

  if(data.name){
    data.name=data.name.toUpperCase();
  }
  data.user=req.user._id;

  try {
    const producto=await Producto.findByIdAndUpdate(id,data, {new: true}).populate('user',['name','role']).populate('category',['name']);
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteProduct = async(req, res=response) => {
  const {id}=req.params;

  try {
    const productoborrado=await Producto.findByIdAndUpdate(id, {status: false}, {new:true}).populate('user',['name','role']).populate('category',['name']);
    return res.status(200).json(productoborrado);
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}