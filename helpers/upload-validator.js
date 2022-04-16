const path = require("path")
const {v4:uuidv4}=require("uuid")

const uploadFiles = (files,extensionesValidas=["png", "jpg", "jpeg", "gif"], carpeta='') => {

  return new Promise((resolve, reject) => {

    const {
      file
    } = files;

    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    if (!extensionesValidas.includes(extension)) {
      return reject(`La extension ${extension} no es permitida; solo: ${extensionesValidas}`)
    }

    const nametemp = uuidv4() + '.' + extension;

    const uploadPath = path.join(__dirname, '../uploads/',carpeta, nametemp);

    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err)
      }
    });

        resolve(nametemp)

  })
}

module.exports = {
  uploadFiles
}