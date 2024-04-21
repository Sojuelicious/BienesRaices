import { validationResult, check } from 'express-validator'

import Usuario from '../models/Usuario.js'
import { generarId } from '../helpers/tokens.js'
import { emailRegistro, emailOlvidePassword } from '../helpers/email.js'
// render llama a la vista login
// El redner toma primero la ruta, luego la informacion que va a pasar
const formularioLogin = (req, res) => {
  res.render('auth/login', {
    pagina: 'Iniciar Sesion'
  })
}

//Como primer parametro se pone la ruta de donde esta el archivo de la vista
const formularioRegistro = (req, res) => {
  res.render('auth/registro', {
    pagina: 'Crear Cuenta'
  })
}

//Para registrar a usuarios que vengan desde el formulario
const registrar = async (req, res) => {
  //Validacion
  //Validar que el nombre no este vacio
  await check('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio')
    .run(req)

  //Validar que sea un email
  await check('email').isEmail().withMessage('Eso no parece un email').run(req)

  //Validar que el email no este vacio
  await check('email')
    .notEmpty()
    .withMessage('El email es obligatorio')
    .run(req)

  //Validar que el passwrod sea de mas de 6 caracteres
  await check('password')
    .isLength({ min: 2 })
    .withMessage('El password debe tener mas de 8 caracteres')
    .run(req)

  //Validar que el password se repita y sea el correcto
  await check('repetir_password')
    .equals(req.body.password)
    .withMessage('EL password no coincide')
    .run(req)

  //MOstramos el resultado de las validaciones anteriores
  let resultado = validationResult(req)

  //Verificar que la lista de errores este vacia
  if (!resultado.isEmpty()) {
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email
      }
    })
  }

  const { nombre, email, password } = req.body

  //Veificar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne({
    where: { email }
  })
  if (existeUsuario) {
    return res.render('auth/registro', {
      pagina: 'Crear Cuenta',
      errores: [{ msg: 'El usuario ya esta registrado' }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email
      }
    })
  }

  console.log(existeUsuario)

  //Creamos usuario a partir de los datos que vienen del formulario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId()
  })

  //enviar email de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token
  })

  //Mostrar mensaje de confirmacion
  res.render('templates/mensaje', {
    pagina: 'Cuenta creada correctamente',
    mensaje:
      'Hemos enviado un mensaje de confirmacion, persiona para ir al enlace'
  })
}

//Funcion que comprueba una cuenta con el token
const confirmar = async (req, res) => {
  const { token } = req.params

  //!Verificar si el token es valido
  const usuario = await Usuario.findOne({ where: { token } })
  console.log(usuario)

  if (!usuario) {
    return res.render('auth/confirmar-cuenta', {
      pagina: 'Error al confirmar tu cuenta',
      mensaje: 'Error al confirmar la cuenta, intenta de nuevo',
      error: true
    })
  }

  //!Confirmar la cuenta
  usuario.token = null
  usuario.confirmado = true
  console.log(usuario)
  await usuario.save()

  res.render('auth/confirmar-cuenta', {
    pagina: 'Cuenta Confirmada',
    mensaje: 'Enhorabuena tu cuenta ha sido confirmada. Bienvenido!'
  })
}

const formularioOlvidePassword = (req, res) => {
  return res.render('auth/olvide-password', {
    pagina: 'Recuperar Cuenta'
  })
}

const resetPassword = async (req, res) => {
  //Validaciones para el email en el formulario
  await check('email').notEmpty().withMessage('Eso no parece un email').run(req)

  let resultado = validationResult(req)

  //!Verificar que el resutlado este vacio
  if (!resultado.isEmpty()) {
    return res.render('auth/olvide-password', {
      pagina: 'Recupera El acceso a tu cuenta',
      errores: resultado.array()
    })
  }

  //Verificar que el usuario este registrado
  const { email } = req.body
  const usuario = await Usuario.findOne({ where: { email } })

  if (!usuario) {
    return res.render('auth/olvide-password', {
      pagina: 'Recupera el acceso a tu cuenta',
      errores: [{ msg: 'El email no esta asociada a ninguna cuenta' }]
    })
  }

  //!Generar un token y enviar el email

  //asignar un token al usuario
  usuario.token = generarId()

  //Guardar el token previo en la base de datos
  await usuario.save()

  //Enviar un email
  emailOlvidePassword({
    email: usuario.email,
    nombre: usuario.nombre,
    token: usuario.token
  })

  //Renderizar un mensaje
  res.render('templates/mensaje', {
    pagina: 'Reestablece tu password',
    mensaje: 'Hemos enviado un email con las instrucciones'
  })
}

const comprobarToken = (req, res, next) => {
  next()
}

const nuevoPassword = (req, res) => {}

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
  confirmar,
  resetPassword,
  comprobarToken,
  nuevoPassword
}
