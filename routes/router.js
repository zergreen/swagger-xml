const { log } = require('console');
const express = require('express')
const router = express.Router();
const soap = require('soap')
const {handleError} = require('../utility-function')

const url = 'http://localhost:3000/ShippingService?wsdl';
const url2 = 'http://localhost:3000/ProductService?wsdl';
const url3 = 'http://localhost:3000/OrdersService?wsdl';


// In your router.js or wherever you define your Swagger annotations
router.use(express.json());

/**
 * @swagger
 * tags:
 *   - name: main
 *     description: Main endpoints
 *   - name: test
 *     description: Test endpoints
 *   - name: marketing
 *     description: Marketing Endpoint
 */

/**
 * @swagger
 * /marketing/shipping-cost:
 *    post:
 *      summary: noti shipping cost
 *      tags:
 *        - marketing
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: shipping
 *          description: The shipping to create
 *          schema:
 *            type: object
 *            required: 
 *              - Shipping_cost
 *            properties:
 *              Shipping_cost:
 *                type: integer
 *                default: 35
 *      responses:
 *        200:
 *          description: shipping complete
 */
router.post('/shipping-cost', (req, res) => {
  const { Shipping_cost } = req.body
  const args = {Shipping_cost};
  soap.createClient(url, function (err, client){
    handleError(err)

    client.shippingCost(args, function (err, result){
      if(err){
        res.status(404).json({error: err})
        
      }
      console.log(result);
      res.status(200).json({info: result})
      
    })
  })
  // res.status(200).json({message: 'shipping_cost: '+Shipping_cost})
})

/**
 * @swagger
 * /marketing/new-product:
 *    post:
 *      summary: Post new product with body
 *      tags:
 *        - marketing
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
 *              - Product_stock
 *              - Exp_date
 *              - Product_status
 *            properties:
 *              ID_product:
 *                type: string
 *                default: PD14
 *              Product_name:
 *                type: string
 *                default: iPhone 14 Pro Max
 *              Product_price:
 *                type: integer
 *                default: 49900
 *              Product_stock:
 *                type: integer
 *                default: 100
 *              Exp_date:
 *                type: string
 *                default: "2025-10-25"
 *              Product_status:
 *                type: string
 *                default: "In stock"
 *              
 *      responses:
 *        200:
 *          description: xxx
 */
router.post('/new-product', (req, res) => {
  // const { Shipping_cost } = req.body
  console.log(req.body)
  const args = req.body
  // res.status(200).json({end: req.body})
  soap.createClient(url2, function (err, client){
    handleError(err)
    client.newProduct(args, function (err, result){
      if(err){
        res.status(404).json({error: err})
      }
      console.log(result);
      res.status(200).json({info: result})
    })
  })
  // res.status(200).json({message: 'shipping_cost: '+Shipping_cost})
})

/**
 * @swagger
 * /marketing/update-product:
 *    post:
 *      summary: Post update product by id,price,stock
 *      tags:
 *        - marketing
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: update-product
 *          description: The update-product to create
 *          schema:
 *            type: object
 *            required: 
 *              - ID_product
 *              - Product_price
 *              - Product_stock
 *            properties:
 *              ID_product:
 *                type: string
 *                default: PD01
 *              Product_price:
 *                type: integer
 *                default: 48000
 *              Product_stock:
 *                type: integer
 *                default: 80
 *              
 *      responses:
 *        200:
 *          description: xxx
 */
router.post('/update-product', (req, res) => {
  console.log(req.body)
  const args = req.body
  // res.status(200).json({end: req.body})
  soap.createClient(url2, function (err, client){
    handleError(err)

    client.updateProduct(args, function (err, result){
      if(err){
        res.status(404).json({error: err})
      }
      console.log(result);
      res.status(200).json({info: result})
    })
  })
})

/**
 * @swagger
 * /marketing/confirm-order:
 *    post:
 *      summary: send confirm order by id
 *      tags:
 *        - marketing
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: confirm-order
 *          description: The confirm-order to create
 *          schema:
 *            type: object
 *            required: 
 *              - ID_order
 *            properties:
 *              ID_order:
 *                type: string
 *                default: ''
 *              
 *      responses:
 *        200:
 *          description: comfirm order complete
 */
router.post('/confirm-order', (req, res) => {
  // const { Shipping_cost } = req.body
  console.log(req.body)
  const args = req.body
  // res.status(200).json({end: req.body})
  soap.createClient(url3, function (err, client){
    handleError(err)

    client.confirmOrders(args, function (err, result){
      if(err){
        res.status(404).json({error: err})
      }
      console.log(result);
      res.status(200).json({info: result})
    })
  })
})

/**
 * @swagger
 * /marketing/cancel-order:
 *    post:
 *      summary: send cancel order by id
 *      tags:
 *        - marketing
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: cancel-order
 *          description: The cancel-order to create
 *          schema:
 *            type: object
 *            required: 
 *              - ID_order
 *            properties:
 *              ID_order:
 *                type: string
 *                default: 999
 *              
 *      responses:
 *        200:
 *          description: cancel order complete
 */
router.post('/cancel-order', (req, res) => {
  // const { Shipping_cost } = req.body
  console.log(req.body)
  const args = req.body
  // res.status(200).json({end: req.body})
  soap.createClient(url3, function (err, client){
    handleError(err)

    client.cancelOrder(args, function (err, result){
      if(err){
        res.status(404).json({error: err})
      }
      console.log(result);
      res.status(200).json({info: result})
    })
  })
})

/**
 * @swagger
 * /marketing/confirm-cancel-order:
 *    post:
 *      summary: send confirm cancel order by id
 *      tags:
 *        - marketing
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: confirm-cancel-order
 *          description: The confirm-cancel-order to create
 *          schema:
 *            type: object
 *            required: 
 *              - ID_order
 *            properties:
 *              ID_order:
 *                type: string
 *                default: ''
 *              
 *      responses:
 *        200:
 *          description: comfirm cancel order complete
 */
router.post('/confirm-cancel-order', (req, res) => {
  // const { Shipping_cost } = req.body
  console.log(req.body)
  const args = req.body
  // res.status(200).json({end: req.body})
  soap.createClient(url3, function (err, client){
    handleError(err)

    client.confirmCancelOrder(args, function (err, result){
      if(err){
        res.status(404).json({error: err})
      }
      console.log(result);
      res.status(200).json({info: result})
    })
  })
})
/**
 * @swagger
 * /marketing/order:
 *    post:
 *      summary: Post new order with body
 *      tags:
 *        - marketing
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: order
 *          description: The order to create
 *          schema:
 *            type: object
 *            required: 
 *              - ID_order
 *              - Name
 *              - Address
 *              - Tel
 *              - Order_date
 *              - Sent_date
 *              - Total_Price
 *              - Discount
 *              - Vat
 *              - Shipping_cost
 *              - Net_balance
 *              - Order_status
 *              - details
 *            properties:
 *              ID_order:
 *                type: string
 *                default: PT131
 *              Name:
 *                type: string
 *                default: John Doe
 *              Address:
 *                type: string
 *                default: 123 Main Street, Bangkok, 10330
 *              Tel:
 *                type: string
 *                default: 081-234-5678
 *              Order_date:
 *                type: string
 *                default: 2023-10-14
 *              Sent_date:
 *                type: string
 *                default: 2023-10-21
 *              Total_Price:
 *                type: number
 *                default: 10000.9
 *              Discount:
 *                type: number
 *                default: 0.55
 *              Vat:
 *                type: number
 *                default: 0.07
 *              Shipping_cost:
 *                type: number
 *                default: 100.0
 *              Net_balance:
 *                type: number
 *                default: 9730.0
 *              Order_status:
 *                type: string
 *                default: "Pending"
 *              details:
 *                type: object
 *                default: [
 *                  {"ID_product":"PD10","Product_name":"Product Name 1","Product_description":"Description of Product 1","Amount": 1,"Unit_Price": 49900.0,"Discount": 1000.0,"Total_price": 489000.0},
 *                  {"ID_product":"PD20","Product_name":"Product Name 2","Product_description":"Description of Product 2","Amount": 2,"Unit_Price": 3500.0,"Discount": 500.0,"Total_price": 6500.0},
 *                ]
 *              
 *      responses:
 *        200:
 *          description:  order complete
 */
router.post('/order', (req, res) => {
  // const { Shipping_cost } = req.body
  console.log(req.body)
  const args = {order: req.body}
  // res.status(200).json({end: req.body})
  soap.createClient(url3, function (err, client){
    console.log(11);
    if (err) {
      console.log(22);
      console.error('Error creating SOAP client:', err);
      return;
    }
    console.log(33);
    console.log(args);
    client.order(args, function (err, result){
      if(err){
        console.log(44);
        console.log(err);
        res.status(404).json({error: err})
      }
      console.log(result);
      console.log(55);
      res.status(200).json({info: result})
    })
  })
})

/**
 * @swagger
 * /example:
 *   get:
 *     summary: Get a list of examples
 *     description: Retrieve a list of example items
 *     tags:
 *       - main
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/example', (req, res) => {
  // Your route logic goes here
  res.json({ message: 'Example route executed successfully' });
});

/**
 * @swagger
 * /api/example:
 *   post:
 *     summary: Creates a new user.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - age
 *           properties:
 *             name:
 *               type: string
 *               default: Green
 *             age:
 *               type: integer
 *               default: 21
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/api/example', (req, res) => {
  const {name , age} = req.body
  res.status(201).json({message: "congrat", data: {name, age}})
});


// /**
//  * @swagger
//  * /hello:
//  *   post:
//  *     summary: Get a greeting
//  *     description: Retrieve a greeting message
//  *     tags:
//  *       - main
//  *     requestBody:
//  *       description: JSON payload for the greeting
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               color:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
// router.post('/hello', (req, res) => {
//   const { color } = req.body;
//   const greeting = `Hello, ${color || 'World'}!`;

//   // Your route logic goes here
//   res.json({ message: greeting });
// });


/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Get a greeting
 *     description: Retrieve a greeting message
 *     tags:
 *       - main
 *     parameters:
 *       - in: query
 *         name: color
 *         description: Color for the greeting (e.g., green)
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/hello', (req, res) => {
  const color = req.query.color || 'World';
  const greeting = `Hello, ${color}!`;

  // Your route logic goes here
  res.json({ message: greeting });
});


/**
* @swagger
* /test-example:
*   get:
*     summary: Get a list of test examples
*     description: Retrieve a list of test example items
*     tags:
*       - test
*     responses:
*       200:
*         description: Successful response
*/
router.get('/test-example', (req, res) => {
  // Your route logic goes here
  res.json({ message: 'Test example route executed successfully' });
});

module.exports = router;