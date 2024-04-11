import express from 'express'

const router = express.Router()
//  Creando el routing
// render llama a la vista login
router.get('/login', (req, res) => {
  res.render('auth/login')
})
router.post('/', (req, res) => {
  res.json({ msg: 'Respuesta al tipo post' })
})

export default router
