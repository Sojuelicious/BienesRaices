import express from 'express'
import router from './routes/usuarioRoutes'

// Creando la app
const app = express()

// Creando el puerto
const port = 3000
app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`)
})
