const {Router}=require('express');
const { check } = require('express-validator');
const { createProduct, getProducts,  getProductById,  updateProduct,  deleteProduct } = require('../controllers/products.controller');
const {  existeCategoriaProducto, existeProductoById } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router=Router();

// obtener todas las categorias
router.get('/',getProducts);


// categoria por id
router.get('/:id',
  [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
  ]
,getProductById);

// crear categoria
router.post('/',[
  validarJWT,
  check('category','No es un id de mongo valido').isMongoId(),
  check('category').custom(existeCategoriaProducto),
  check('name',"el nombre es obligatorio").not().isEmpty(),
  check('description',"La descripcion es obligatoria").not().isEmpty(),
  check('price',"El precio es obligatorio").not().isEmpty(),
  check('price',"Debes colocar un numero en el precio").isNumeric(),
  check('quantity',"Debes colocar un numero en la cantidad").isNumeric(),
  check('quantity',"La cantidad es obligatoria").not().isEmpty(),
  check('colors','El color o los colores deben venir en un array').isArray(),
  check('sizes','Las tallas deben venir en un array').isArray(),
  validarCampos
],createProduct);

// categoria actualizar
router.put('/:id',
  [
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoById),
    check('name',"el nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ]
  ,updateProduct);

// borrar categoria solo si es admin borrar logico
router.delete('/:id',
  [
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos,
  ]
,deleteProduct);
module.exports =router;