const express = require('express')
const router = express.Router();
const soap = require('soap')
const {handleError, logger} = require('../utility-function')

const url = 'http://localhost:8000/stock-service?wsdl';


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
 *                type: string
 *                default: PD14
 *              Product_name:
 *                type: string
 *                default: iPhone 14 Pro Max
 *              Product_price:
 *                type: number
 *                default: 48000
 *              Product_quantity:
 *                type: number
 *                default: 80
 *              Expire_date:
 *                type: string
 *                default: "2025-10-25"
 *              Product_status:
 *                type: string
 *                default: "In stock"
 *              
 *      responses:
 *        200:
 *          description: update item success fully
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

  /**
 * @swagger
 * /stock/update-item:
 *    post:
 *      summary: Post add item with body
 *      tags:
 *        - stock
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: update-item
 *          description: The update-item to create
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
 *                type: string
 *                default: PD14
 *              Product_name:
 *                type: string
 *                default: iPhone 14 Pro Max
 *              Product_price:
 *                type: number
 *                default: 49900
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
router.post('/update-item', (req, res) => {
  console.log(req.body)
  const args = req.body
  soap.createClient(url, function (err, client){
    handleError(err)
    client.UpdateItem(args, function (err, result){
      if(err){
        console.log(err);
        res.status(404).json({error: err})
      }
      logger.info(`${req.method} ${req.url}`);
      res.status(200).json({info: result})
    })
  })
})

/**
 * @swagger
 * /stock/add-ship-cost:
 *    post:
 *      summary: noti shipping cost
 *      tags:
 *        - stock
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: shipping
 *          description: The shipping to create
 *          schema:
 *            type: object
 *            required: 
 *              - ID_shipment
 *              - Shipping_cost
 *            properties:
 *              ID_shipment:
 *                type: string
 *                default: SHIP1 
 *              Shipping_cost:
 *                type: number
 *                default: 35.75
 *      responses:
 *        200:
 *          description: shipping complete
 */
router.post('/add-ship-cost', (req, res) => {
  const { ID_shipment,Shipping_cost } = req.body
  // const args = {ID_shipment,Shipping_cost};
  const args = req.body
  soap.createClient(url, function (err, client){
    handleError(err)

    client.AddShippingCost(args, function (err, result){
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
 * /stock/order:
 *    post:
 *      summary: Post new order with body
 *      tags:
 *        - stock
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: order
 *          description: The order to create
 *          schema:
 *            type: object
 *            required: 
 *              - ID_shipment
 *              - ID_order
 *              - Name
 *              - Address
 *              - Tel
 *              - Order_date
 *              - Sent_date
 *              - Total_Price
 *              - Discount
 *              - Vat
 *              - Shipment_cost
 *              - Shipping_company
 *              - Track_no
 *              - Net_balance
 *              - Order_status
 *              - details
 *            properties:
 *              ID_shipment:
 *                type: string
 *                default: SHIP131
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
 *                type: int
 *                default: 7
 *              Shipment_cost:
 *                type: number
 *                default: 100.0
 *              Shipping_company:
 *                type: string
 *                default: Kerry
 *              Track_no:
 *                type: string
 *                default: IW4NT25L33P
 *              Net_balance:
 *                type: number
 *                default: 9730.0
 *              Order_status:
 *                type: string
 *                default: "Pending"
 *              details:
 *                type: object
 *                default: [
 *                  {"ID_product":"PD10","Product_name":"Product Name 1","Product_description":"Description of Product 1","Product_quantity": 1,"Product_price": 49900.0,"Discount": 1000.0,"Total_price": 48900.0},
 *                  {"ID_product":"PD20","Product_name":"Product Name 2","Product_description":"Description of Product 2","Product_quantity": 2,"Product_price": 49900.0,"Discount": 500.0,"Total_price": 6500.0},
 *                ]
 *              
 *      responses:
 *        200:
 *          description:  order complete
 */
router.post('/order', (req, res) => {
  // const { Shipping_cost } = req.body
  console.log(req.body)
  const order = req.body
  console.log('---order---');
  console.log(order);
  const args = req.body
  // res.status(200).json({end: req.body})
  soap.createClient(url, function (err, client){
    console.log(11);
    if (err) {
      console.log(22);
      console.error('Error creating SOAP client:', err);
      return;
    }
    console.log(33);
    console.log(args);
    client.AddOrder(args, function (err, result){
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
 * /stock/confirm-order:
 *    post:
 *      summary: send confirm order by id
 *      tags:
 *        - stock
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
 *                default: PT131
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
  soap.createClient(url, function (err, client){
    handleError(err)

    client.ConfirmOrder(args, function (err, result){
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
 * /stock/cancel-order:
 *    post:
 *      summary: send confirm order by id
 *      tags:
 *        - stock
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
 *                default: PT131
 *              
 *      responses:
 *        200:
 *          description: cancel order complete
 */
router.post('/cancel-order', (req, res) => {
  console.log(req.body)
  const args = req.body
  // res.status(200).json({end: req.body})
  soap.createClient(url, function (err, client){
    handleError(err)

    client.CancelOrder(args, function (err, result){
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
 * /stock/request-cancel-order:
 *    post:
 *      summary: send request cancel order by id
 *      tags:
 *        - stock
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: request-cancel-order
 *          description: The request-cancel-order to create
 *          schema:
 *            type: object
 *            required: 
 *              - ID_order
 *            properties:
 *              ID_order:
 *                type: string
 *                default: PT131
 *              
 *      responses:
 *        200:
 *          description: request cancel order complete
 */
router.post('/request-cancel-order', (req, res) => {
  console.log(req.body)
  const args = req.body
  // res.status(200).json({end: req.body})
  soap.createClient(url, function (err, client){
    handleError(err)

    client.RequestCancelOrder(args, function (err, result){
      if(err){
        res.status(404).json({error: err})
      }
      console.log(result);
      res.status(200).json({info: result})
    })
  })
})



module.exports = router;