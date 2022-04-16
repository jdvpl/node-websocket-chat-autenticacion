const dbValidators=require('./db-validators')
const generateJTW=require('./generate-jwt')
const googleJWT=require('./generate-jwt')
const googleVerify=require('./google-verify')


module.exports ={
  ...dbValidators,
  ... generateJTW,
  ... googleJWT,
  ... googleVerify
}