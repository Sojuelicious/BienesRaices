import express from 'express'

//Esta es la ruta de los controladores
import {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
  confirmar,
  resetPassword
} from '../controllers/usuarioController.js'

const router = express.Router()
//  Creando el routing

//Aqui se pueden crear las rutas que uno quiera
//Como primer parametro es el url, como segundo parametro el controlador
router.get('/login', formularioLogin)

router.get('/registro', formularioRegistro)

//Utilizamos post para registrar a usuarios que vengan desde el formulario
router.post('/registro', registrar)

router.get('/confirmar/:token', confirmar)

router.get('/olvide-password', formularioOlvidePassword)
router.post('/olvide-password', resetPassword)
export default router
