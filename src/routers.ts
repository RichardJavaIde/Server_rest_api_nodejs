import {Router}  from 'express'
import { crearProduct } from './handlers/product'


const router = Router()

//Routes
router.get('/', (req, res) => {
  res.send('Hello Router!')
  
})
router.post('/products', crearProduct)

export default router