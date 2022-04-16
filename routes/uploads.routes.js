const {Router}=require('express');
const { check } = require('express-validator');
const { uploadFile, updateImageDb, mostrarImgenes, uploadFileCloudinary, updateImageDbCloudinary } = require('../controllers/uploads.controller');
const { coleecionesPermitidas } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { isFileUploaded } = require('../middlewares/validate-file');

const router=Router();


router.post('/',isFileUploaded, uploadFile);

router.put('/:collection/:id',
  [
    isFileUploaded,
    check('id','El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => coleecionesPermitidas(c , ['users','productos'])),
    validarCampos
  ],
  updateImageDbCloudinary);
// updateImageDb);

router.get('/:collection/:id',
  [
    check('id','El id debe ser de mongo').isMongoId(),
    check('collection').custom(c => coleecionesPermitidas(c , ['users','productos'])),
    validarCampos
  ],
  mostrarImgenes);


module.exports =router;