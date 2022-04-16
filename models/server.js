const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConection } = require('../database/database');
class Server{
  constructor(){
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths={
      auth:'/api/auth',
      users:'/api/users',
      categories:'/api/categories',
      products:'/api/products',
      buscar:'/api/search',
      upload:'/api/upload',
      message:'/api/message'
    }

    // conectar a la base de datos
    this.conectarDb()
    // middleware: son funcionalidads para el webserver
    this.middlewares();
    // rutas de mi app
    this.routes();
  }

  async conectarDb(){
    await dbConection()
  }

  routes() {
    this.app.use(this.paths.users, require('../routes/user.routes'))
    this.app.use(this.paths.auth, require('../routes/auth.routes'))
    this.app.use(this.paths.categories, require('../routes/categorias.routes'))
    this.app.use(this.paths.products, require('../routes/products.routes'))
    this.app.use(this.paths.buscar, require('../routes/search.routes'))
    this.app.use(this.paths.upload, require('../routes/uploads.routes'))
    this.app.use(this.paths.message, require('../routes/messages.routes'))
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Corriendo http://localhost:${this.port}`)
    });
  }

  middlewares() {
    // usar cors
    this.app.use(cors());

    // parseo de la info del body
    this.app.use(express.json())
    // directorio publico
    this.app.use(express.static("public"));

    // /middleware de la suida dei magenes
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath:true
  }));
  }
}

module.exports = Server;