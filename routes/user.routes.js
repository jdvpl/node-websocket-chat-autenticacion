const {Router}=require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete } = require('../controllers/user.controller');
const { esRoleValido,existeCorreo,existeID } = require('../helpers/db-validators');

const {esAdminRole,tieneRole,validarCampos,validarJWT}=require('../middlewares')
const router=Router();


router.get('/',userGet);
router.put('/:id',
  [
    check('id', "No es un id valido").isMongoId(),
    check('id').custom(existeID),
    check('role').custom(esRoleValido ),

    validarCampos,
  ],
userPut);
router.post('/', [
  check('name','El nombre es obligatorio').not().isEmpty(),
  check('password','La contraseña debe tener minimo 6 caracteres').isLength({ min: 6}),
  check('email','Correo no valido').isEmail(),
  // check('role','No es un rol valido').isIn(["ADMIN_ROLE","USER_ROLE"]),
  check('role').custom(esRoleValido ),
  check('email').custom(existeCorreo ),
  validarCampos
],userPost);
router.delete('/:id', 
  [
    validarJWT,
    // esAdminRole,
    tieneRole("ADMIN_ROLE","VENTAS_ROLE"),
    check('id', "No es un id valido").isMongoId(),
    check('id').custom(existeID),
    validarCampos
  ],
userDelete);


module.exports =router;