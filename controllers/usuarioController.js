// render llama a la vista login
// El redner toma primero la ruta, luego la informacion que va a pasar
const formularioLogin = (req, res) => {
  res.render('auth/login', {})
}

//Como primer parametro se pone la ruta de donde esta el archivo de la vista
const formularioRegistro = (req, res) => {
  res.render('auth/registro', {})
}

export { formularioLogin, formularioRegistro }
