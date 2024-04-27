import { Categoria, Precio, Propiedad } from '../models/index.js'
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
    precios: precios,
    datos: {}
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
  //Creando un registro hacia la base de datos
  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    latitud,
    longitud,
    precio: precioId,
    categoria: categoriaId
  } = req.body
  try {
    const propiedadGuardada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      latitud,
      longitud,
      precioId,
      categoriaId
    })
  } catch (error) {
    console.log(error)
  }
}

export { admin, crear, guardar }
