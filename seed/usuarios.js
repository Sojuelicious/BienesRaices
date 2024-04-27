import bcrypt from 'bcrypt'

const usuarios = [
  {
    nombre: 'Heber',
    email: 'email@email.com',
    confirmado: 1,
    password: bcrypt.hashSync('123', 10)
  }
]

export default usuarios
