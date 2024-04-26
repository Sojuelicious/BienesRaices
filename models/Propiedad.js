import { DataTypes, INTEGER } from 'sequelize'
import db from '../config/db.js'

const Propiedad = db.define('propiedades', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  habitaciones: {
    DataTypes: INTEGER,
    allowNull: false
  },
  estacionamiento: {
    DataTypes: INTEGER,
    allowNull: false
  },
  wc: {
    DataTypes: INTEGER,
    allowNull: false
  },
  calle: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  latitud: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publicado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

export default Propiedad
