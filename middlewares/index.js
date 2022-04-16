const validarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-role');
const validarFileUpload = require('../middlewares/validate-file');

module.exports ={
  ...validarCampos,
  ...validarJWT,
  ...validaRoles,
  ... validarFileUpload
}