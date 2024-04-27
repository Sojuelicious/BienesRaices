import express from 'express'
import { body } from 'express-validator'
import { admin, crear, guardar } from '../controllers/propiedadController.js'
import protegerRuta from '../middleware/protegerRuta.js'

const router = express.Router()

router.get('/mis-propiedades', protegerRuta, admin)

router.get('/propiedades/crear', protegerRuta, crear)

router.post(
  '/propiedades/crear',
  protegerRuta,
  //Aplicando Validaciones
  body('titulo').notEmpty().withMessage('El titulo es obligatorio'),
  body('descripcion')
    .notEmpty()
    .withMessage('Debe añadir una descripcion')
    .isLength({ max: 200 })
    .withMessage('La descripcion debe 200 caracteres como maximo'),
  body('categoria').notEmpty().withMessage('Selecciona una categoría'),
  body('precio').notEmpty().withMessage('Selecciona un rango de Precios'),
  body('habitaciones')
    .isNumeric()
    .withMessage('Seleccione una cantidad de habitaciones'),
  body('estacionamiento')
    .isNumeric()
    .withMessage('Seleccione cantidad de espacio de estacionamientos'),
  body('wc').isNumeric().withMessage('Seleccione la cantidad de baños'),
  body('latitud')
    .notEmpty()
    .withMessage('Seleccione una hubicacion en el mapa'),

  guardar
)

export default router
