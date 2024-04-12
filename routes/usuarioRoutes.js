import express from 'express'

//Esta es la ruta de los controladores
import {
  formularioLogin,
  formularioRegistro
} from '../controllers/usuarioController.js'

const router = express.Router()
//  Creando el routing

//Aqui se pueden crear las rutas que uno quiera
//Como primer parametro es el url, como segundo parametro el controlador
router.get('/login', formularioLogin)
router.get('/registro', formularioRegistro)

export default router
