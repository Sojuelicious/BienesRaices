import express from 'express'
import usuarioRouter from './routes/usuarioRoutes.js'

// Creando la app
const app = express()

// Habilitar PUG
app.set('view engine', 'pug')
app.set('views', './views')

// Routing, tambien puede conciderarse midleware
// Se puede utilizar este USE para utilizar cookies
app.use('/auth', usuarioRouter)

// Creando el puerto
const port = 3000
app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`)
})
