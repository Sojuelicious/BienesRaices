import precios from './Precio.js'
import usuarios from './usuarios.js'
import categorias from './Categorias.js' //Datos

// import Categoria from '../models/Categoria.js' //Modelo de la tabla de la bd
// import Precio from '../models/Precio.js'

import { Categoria, Precio, Usuario } from '../models/index.js'

import db from '../config/db.js' //Instancia de la base de datos

const importarDatos = async () => {
  try {
    //Autenticar en la db

    await db.authenticate()

    //Generar las columnas

    await db.sync()

    //insertar los datos

    //? Le pasamos los datos que vienen de categorias como parametro
    await Promise.all([
      Categoria.bulkCreate(categorias),
      Precio.bulkCreate(precios),
      Usuario.bulkCreate(usuarios)
    ])
    console.log('Datos insertados correctamente')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1) //! IMPORTANTE Terminar el proceso si encuentra un error
  }
}

const eliminarDatos = async () => {
  try {
    await db.sync({ force: true })
    console.log('Datos Eliminados Correctamente')
    process.exit()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-i') {
  importarDatos()
}

if (process.argv[2] === '-e') {
  eliminarDatos()
}
