const {Router}=require('express');
const { check } = require('express-validator');
const { buscar, searProdutByCategory } = require('../controllers/search.controller');
const { existeCategoriaById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares');

const router=Router();


router.get('/:collection/:termino',buscar)
router.get('/:id',
  [
    check('id',"No es un id de mongo valido").isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
  ]
,searProdutByCategory)

module.exports =router;
