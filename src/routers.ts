import {Router}  from 'express'
import { crearProduct, getProductById, getProducts, UpdateProduct } from './handlers/product'
import {body, param } from 'express-validator'
import { handleInputErrors } from './middleware'


const router = Router()

//Routes
//Get all products
router.get('/products', getProducts)

//Get product by id
router.get('/products/:id',//validar
param('id').isNumeric().withMessage('ID is not valid'),
handleInputErrors
, getProductById)

//Create product
router.post('/products',
  //Validation middleware
  body('name').notEmpty().withMessage('Name is required'),
  body('price').notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than 0'),
    handleInputErrors,
  crearProduct)

  //Update product
  router.patch('/products/:id',
  //Validation middleware
  param('id').isNumeric().withMessage('ID is not valid'),
  handleInputErrors,)

  router.put('/products/:id',
  //Validation middleware
  param('id').isNumeric().withMessage('ID is not valid'),
  body('name').notEmpty().withMessage('Name is required'),
  body('price').notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than 0'),
    body('availability').isBoolean().withMessage('Availability must be a boolean'),
  handleInputErrors,
UpdateProduct)

  //Delete product
  router.delete('/products/:id',
  //Validation middleware
  param('id').isNumeric().withMessage('ID is not valid'),
  handleInputErrors,)
   
export default router