import {Router}  from 'express'
import { crearProduct, getProductById, getProducts } from './handlers/product'
import {body, param } from 'express-validator'
import { handleInputErrors } from './middleware'


const router = Router()

//Routes
router.get('/products', getProducts)
router.get('/products/:id',//validar
param('id').isNumeric().withMessage('ID is not valid'),
handleInputErrors
, getProductById)

router.post('/products',
  //Validation middleware
  body('name').notEmpty().withMessage('Name is required'),
  body('price').notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than 0'),
    handleInputErrors,
  crearProduct)

export default router