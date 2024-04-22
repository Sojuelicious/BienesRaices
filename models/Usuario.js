import { DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../config/db.js'

//Aqui creamos la tabla usuarios utilizando sequelize, el primer parametro es el nombre de la tabla y el segundo son los datos
const Usuario = db.define(
  'usuarios',
  {
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
  },
  {
    hooks: {
      beforeCreate: async function (usuario) {
        const salt = await bcrypt.genSalt(10)
        //Instancia del usuario que viene del parametro de la funcion
        usuario.password = await bcrypt.hash(usuario.password, salt)
      }
    }
  }
)

//Meotod personalizado
Usuario.prototype.verificarPassword = function (password) {
  //El primer password es lo que se le pasaa desde el formulario
  //el this.password es lo que se compara en la base de datos
  return bcrypt.compareSync(password, this.password)
}

export default Usuario
