const express = require('express')
const router = express.Router();
const {handleError, logger} = require('../utility-function')
const axios = require('axios')



// In your router.js or wherever you define your Swagger annotations
router.use(express.json());

/**
 * @swagger
 * tags:
 *   - name: service
 *     description: service endpoints
 */

/**
 * @swagger
 * /service/new-product:
 *    post:
 *      summary: Post add item with body
 *      tags:
 *        - service
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: new-product
 *          description: The new-product to create
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
router.post('/new-product', (req, res) => {
    const args = req.body;
    console.log(args);
   
      // api1
      axios.post('http://localhost:8080/stock/add-item', args, )
        .then(response => {
          console.log('Response from api1:', response.data);
          
          // If api1 responds with a 200 status, call api2
          if (response.status === 200) {
            const args2 = {
                "ID_product":args.ID_product,
                "Product_name":args.Product_name,
                "Product_price":args.Product_price,
                "Product_stock":args.Product_quantity,
                "Exp_date":args.Expire_date,
                "Product_status":args.Product_status
            }
            // console.log("args2");
            // console.log(args2);
            return axios.post('http://localhost:8080/marketing/new-product', args2, );
          }
        })
        .then(response => {
          if (response) {
            console.log('Response from api2:', response.data);
            res.status(200).json(response.data)
          }
        })
        .catch(error => {
          console.error('Error:', error);
          res.status(405).json({err:"ERROR to query"})
        });
      
  })




module.exports = router;