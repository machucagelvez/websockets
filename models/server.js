const express = require("express");
const cors = require("cors");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app); //Este es el server que se crea con socket.io
    this.io = require("socket.io")(this.server);

    //Paths
    this.paths = {};

    //Middlewares
    this.middlewares();

    //Rutas de la aplicación
    this.routes();

    //Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    //Llama al archivo en donde están las rutas:
    // this.app.use(this.paths.auth, require('../routes/auth'))
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    //Se levanta el server creado con socket.io
    this.server.listen(this.port, () => {
      console.log("Servidor ejecutándose en puerto", this.port);
    });
  }
}

module.exports = Server;
