import Categoria from '../models/Categoria.js'
import Precio from '../models/Precio.js'
import { validationResult } from 'express-validator'

const admin = (req, res) => {
  res.render('propiedades/admin', {
    pagina: 'Mis propiedades',
    barra: true
  })
}

//Formulario para crear una nueva propiedad
const crear = async (req, res) => {
  //Consultar modelo de precio y categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll()
  ])

  res.render('propiedades/crear', {
    pagina: 'Crear Propiedad',
    barra: true,
    categorias: categorias,
    precios: precios
  })
}

const guardar = async (req, res) => {
  //Resultado validacion
  let resultado = validationResult(req)

  if (!resultado.isEmpty()) {
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll()
    ])

    return res.render('propiedades/crear', {
      pagina: 'Crer Propiedad',
      barra: true,
      categorias: categorias,
      precios: precios,
      errores: resultado.array(),
      datos: req.body
    })
  }
}

export { admin, crear, guardar }
