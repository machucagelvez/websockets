const socketController = (socket) => {
  //socket es el nombre que se da al argumento, puede ser cualquier nombre
  console.log('Cliente conectado', socket.id)
  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id)
  })

  //Recibir info enviada a través del evento "enviar-mensaje-desde-cliente":
  socket.on('enviar-mensaje-desde-cliente', (payload, callback) => {
    // Callback es la función que se envió desde el cliente
    const id = 123456
    const cliente = payload.mensaje
    callback({ id, cliente }) //Se ejecuta el callback de retroalimentación
    //Enviar info desde al server a todos los clientes:
    socket.broadcast.emit('enviar-mensaje-desde-server', payload) //Podría haberse recibido el this.io para utilizarlo pero es mejor utilizar el socket
  })
}

module.exports = {
  socketController,
}
