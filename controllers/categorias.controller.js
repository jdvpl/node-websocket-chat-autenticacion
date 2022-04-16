const { response } = require("express")
const {Categoria}=require("../models")


// obtener todas la categorias- paginacion-total y populate(relacion de quien la creo)
const getCategories=async(req, res=response) => {
  const {limite=5, desde=0}=req.query;
  const estado={status:true}
  const [total,categories]=await Promise.all([
    Categoria.countDocuments(estado),
    Categoria.find(estado)
      .populate('user',['name',"role"])
      .skip(Number(desde))
      .limit(Number(limite))
  ])
  res.json({total,limite,desde,categories});
}
// obtener todas la categoria por id paginacion-total y populate(relacion de quien la creo)
const getCategoryById=async(req, res=response) => {
  const {id}=req.params;
  try {
    const category=await Categoria.findById(id).populate('user',["name","role"]);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error)
  }
  
}


// crear caregoria
const createCategory = async(req,res=response)=>{
  const name = req.body.name.toUpperCase();
  const categoriaDb=await Categoria.findOne({name});
  if(categoriaDb){
    return res.status(400).json({msg: `La categoria ${name} ya existe.`})
  }
  // generar la data al guardar
  const data={
    name,
    user: req.user._id
  }
  try {
    const category=new Categoria(data);
    await category.save();
    return  res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error)
  }
}
// actualizar categoria
const updateCategory=async(req, res=response) => {
  const {id}=req.params;
  const {status,user,...data}=req.body;
  data.name=data.name.toUpperCase();
  data.user=req.user._id;

  try {
    const category=await Categoria.findByIdAndUpdate(id,data, {new: true}).populate('user',['name','role']);
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json(error)
  }
}

const deleteCategory = async(req, res=response) => {
  const {id}=req.params;

  try {
    const categoriaBorrada=await Categoria.findByIdAndUpdate(id, {status: false}, {new:true}).populate('user',['name','role']);
    return res.status(200).json(categoriaBorrada);
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
}