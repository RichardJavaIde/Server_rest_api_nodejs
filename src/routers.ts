import {Router}  from 'express'
import { crearProduct } from './handlers/product'
import {body } from 'express-validator'


const router = Router()

//Routes
router.get('/', (req, res) => {
  res.send('Hello Router!')
  
})
router.post('/products',
  body('name').notEmpty().withMessage('Name is required'),
  body('price').notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than 0'),
  crearProduct)

export default router