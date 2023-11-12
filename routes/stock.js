const express = require('express')
const router = express.Router();
const soap = require('soap')
const {handleError, logger} = require('../utility-function')

const url = 'http://localhost:8000/stock-service/api/?wsdl';


// In your router.js or wherever you define your Swagger annotations
router.use(express.json());

/**
 * @swagger
 * tags:
 *   - name: stock
 *     description: Stock endpoints
 */

/**
 * @swagger
 * /stock/test:
 *    get:
 *      summary: test 
 *      tags:
 *        - stock
 *      responses:
 *        200:
 *          description: shipping complete
 */
router.get('/test', (req, res) =>{
    res.json({message:"test json"})
})

/**
 * @swagger
 * /stock/add-item:
 *    post:
 *      summary: Post add item with body
 *      tags:
 *        - stock
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: add-item
 *          description: The add-item to create
 *          schema:
 *            type: object
 *            required: 
 *              - ID_product
 *              - Product_name
 *              - Product_price
 *              - Product_quantity
 *              - Expire_date
 *              - Product_status
 *            properties:
 *              ID_product:
 *                type: number
 *                default: 1
 *              Product_name:
 *                type: string
 *                default: iPhone 14 Pro Max
 *              Product_price:
 *                type: number
 *                default: 10
 *              Product_quantity:
 *                type: number
 *                default: 50
 *              Expire_date:
 *                type: string
 *                default: "2025-10-25"
 *              Product_status:
 *                type: string
 *                default: "In stock"
 *              
 *      responses:
 *        200:
 *          description: add item success fully
 */
router.post('/add-item', (req, res) => {
    console.log(req.body)
    const args = req.body
    soap.createClient(url, function (err, client){
      handleError(err)
      client.AddItem(args, function (err, result){
        if(err){
          console.log(err);
          res.status(404).json({error: err})
        }
        logger.info(`${req.method} ${req.url}`);
        res.status(200).json({info: result})
      })
    })
  })




module.exports = router;