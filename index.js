import express from 'express'
import usuarioRouter from './routes/usuarioRoutes.js'
import db from './config/db.js'

// Creando la app
const app = express()

//!Conexion a la base de datos
try {
  await db.authenticate()
  console.log('Conexion establecida correctamente')
} catch (error) {
  console.log(error)
}

// Habilitar PUG
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta publica
app.use(express.static('public'))

// Routing, tambien puede conciderarse midleware
// Se puede utilizar este USE para utilizar cookies
app.use('/auth', usuarioRouter)

// Creando el puerto
const port = 3000
app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`)
})
