import { validationResult, check } from 'express-validator'

import Usuario from '../models/Usuario.js'
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
      errores: resultado.array()
    })
  }

  //Creamos usuario a partir de los datos que vienen del formulario
  const usuario = await Usuario.create(req.body)
  res.json(usuario)
}

const formularioOlvidePassword = (req, res) => {
  res.render('auth/olvide-password', {
    pagina: 'Recuperar Cuenta'
  })
}

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar
}
