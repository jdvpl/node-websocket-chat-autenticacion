const {Router}=require('express');
const { check } = require('express-validator');
const { getMessages, createMessage } = require('../controllers/messages.controller');

const { validarCampos } = require('../middlewares/validar-campos');

const router=Router();

// obtener todas las categorias
router.get('/',getMessages);

// crear categoria
router.post('/',[
  check('name',"el nombre es obligatorio").not().isEmpty(),
  check('message',"el mensaje es obligatorio").not().isEmpty(),
  validarCampos
],createMessage);

module.exports =router;