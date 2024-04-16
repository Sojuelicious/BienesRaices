import { DataTypes } from 'sequelize'
import db from '../config/db.js'

//Aqui creamos la tabla usuarios utilizando sequelize, el primer parametro es el nombre de la tabla y el segundo son los datos
const Usuario = db.define('usuarios', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING
  },
  confirmado: {
    type: DataTypes.BOOLEAN
  }
})

export default Usuario
