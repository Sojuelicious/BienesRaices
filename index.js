import express from 'express'
import usuarioRouter from './routes/usuarioRoutes.js'
import db from './config/db.js'

// Creando la app
const app = express()

//Habilitar la lectura de datos desde formularios
app.use(express.urlencoded({ extended: true }))

//!Conexion a la base de datos
try {
  await db.authenticate()
  db.sync()
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
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Escuchando el puerto ${port}`)
})
