//Referencias del html
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

// Socket del cliente (mantiene activa la conexion con el servidor):
const socket = io()

// Los eventos "on" son los que escuchan un evento
socket.on('connect', () => {
  // console.log("Conectado");
  lblOffline.style.display = 'none'
  lblOnline.style.display = ''
})

socket.on('disconnect', () => {
  // console.log("Desconectado del servidor");
  lblOnline.style.display = 'none'
  lblOffline.style.display = ''
})

//Recibir info del server:
socket.on('enviar-mensaje-desde-server', (payload) => {
  console.log(payload)
})

btnEnviar.addEventListener('click', () => {
  const mensaje = txtMensaje.value
  const payload = {
    mensaje,
    id: '123',
    fecha: new Date().getTime(),
  }
  //Enviar al servidor. Argumentos:
  //1. Nombre de lo que se va a enviar
  //2. Lo que se va a enviar
  //3. Callback para recibir retroalimentación
  socket.emit('enviar-mensaje-desde-cliente', payload, (id) => {
    console.log('Desde el server', id)
  })
})
