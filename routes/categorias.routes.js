const {Router}=require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/categorias.controller');
const { existeCategoriaById } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router=Router();

// obtener todas las categorias
router.get('/',getCategories);


// categoria por id
router.get('/:id',
  [
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
  ]
,getCategoryById);

// crear categoria
router.post('/',[
  validarJWT,
  check('name',"el nombre es obligatorio").not().isEmpty(),
  validarCampos
],createCategory);

// categoria actualizar
router.put('/:id',
  [
    validarJWT,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('name',"el nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ]
  ,updateCategory);

// borrar categoria solo si es admin borrar logico
router.delete('/:id',
  [
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos,
  ]
,deleteCategory);
module.exports =router;