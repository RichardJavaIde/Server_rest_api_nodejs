import {Router}  from 'express'
import { crearProduct, getProductById, getProducts, UpdateAvailability, UpdateProduct,deleteProduct } from './handlers/product'
import {body, param } from 'express-validator'
import { handleInputErrors } from './middleware'


const router = Router()
/**
 * @swagger
 *components:
 *  schemas:
 *     Product:  
 *       type: object
 *       properties:
 *         id:  
 *          type: integer
 *          description: The product ID
 *          example: 1
 *         name:
 *          type: string
 *          description: The product name
 *          example: "Mause Gamer"
 *         price:
 *          type: number
 *          description: The price of the product
 *          example: 250
 *         availability:
 *          type: boolean
 *          description: The availability status of the product
 *          example: true
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     description: Retrieve a list of products from the database
 *     responses:
 *       200:
 *         description: A JSON array of product objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid ID supplied
 */
//Get product by id
router.get('/:id',//validar
param('id').isNumeric().withMessage('ID is not valid'),
handleInputErrors
, getProductById)

/**
 * @swagger
 * /products:
 *  post:
 *    summary: Create a new product
 *    tags: [Products]
 *    description: Create a new product with the provided name and price
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *              name:
 *               type: string
 *               example: "Keyboard"
 *              price:
 *                type: number 
 *                example: 100
 *    responses:
 *     201:
 *      description: Product created successfully
 *     400:
 *      description: Invalid input data
 * 
 * 
 */

//Create product
router.post('/',
  //Validation middleware
  body('name').notEmpty().withMessage('Name is required'),
  body('price').notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than 0'),
    handleInputErrors,
  crearProduct)

  //Update product
  router.patch('/:id',
  //Validation middleware
  param('id').isNumeric().withMessage('ID is not valid'),
  handleInputErrors,)

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     description: Update the details of an existing product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *           type: object
 *           properties:
 *              name:
 *               type: string
 *               example: "Keyboard"
 *              price:
 *                type: number 
 *                example: 100
 *              availability:
 *                type: boolean
 *                example: true
 *     responses:
 *          200:
 *            description: Product created successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Product'
 *          400:
 *            description: Invalid input data
 *          404:
 *           description: Product not found  
 *         
 */

  router.put('/:id',
  //Validation middleware
  param('id').isNumeric().withMessage('ID is not valid'),
  body('name').notEmpty().withMessage('Name is required'),
  body('price').notEmpty().withMessage('Price is required')
    .isNumeric().withMessage('Price must be a number')
    .custom(value => value > 0).withMessage('Price must be greater than 0'),
    body('availability').isBoolean().withMessage('Availability must be a boolean'),
  handleInputErrors,
UpdateProduct)


/**
 * @swagger
 * /products/{id}:
 *   patch:
 *        summary: Modify product availability
 *        tags: [Products]
 *        description: Modify the availability status of a product
 *        parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             schema:
 *                type: integer
 *        responses:
 *          200:
 *            description: Product modify successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Product'
 *          400:
 *            description: Invalid input data
 *          404:
 *           description: Product not found  
 */

//modify availability
router.patch('/:id',
  //Validation middleware
  param('id').isNumeric().withMessage('ID is not valid'),
  handleInputErrors,
  UpdateAvailability)

  /**
 * @swagger
 * /products/{id}:
 *   delete:
 *        summary: Delete a product by ID
 *        tags: [Products]
 *        description: Delete a product from the database using its ID
 *        parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             schema:
 *                type: integer
 *        responses:
 *          200:
 *            description: Product delete successfully
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 *                  value: "Product deleted successfully"
 *          400:
 *            description: Invalid input data
 *          404:
 *           description: Product not found  
 */

  //Delete product
  router.delete('/:id',
  //Validation middleware
  param('id').isNumeric().withMessage('ID is not valid'),
  handleInputErrors, deleteProduct)
   
export default router