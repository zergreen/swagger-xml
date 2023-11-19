const express = require("express");
const router = express.Router();
const { handleError, logger } = require("../utility-function");
const axios = require("axios");
const { log } = require("winston");

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
 *          description: add item success fully
 */
router.post("/new-product", (req, res) => {
  const args = req.body;
  console.log(args);

  // api1
  axios
    .post("http://localhost:8080/stock/add-item", args)
    .then((response) => {
      console.log("Response from api1:", response.data);

      // If api1 responds with a 200 status, call api2
      if (response.status === 200) {
        const args2 = {
          ID_product: args.ID_product,
          Product_name: args.Product_name,
          Product_price: args.Product_price,
          Product_stock: args.Product_quantity,
          Exp_date: args.Expire_date,
          Product_status: args.Product_status,
        };
        // console.log("args2");
        // console.log(args2);
        return axios.post("http://localhost:8080/marketing/new-product", args2);
      }
    })
    .then((response) => {
      if (response) {
        console.log("Response from api2:", response.data);
        res.status(200).json(response.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(405).json({ err: "ERROR to query" });
    });
});

/**
 * @swagger
 * /service/update-product:
 *    post:
 *      summary: Post add item with body
 *      tags:
 *        - service
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
 *          description: add item success fully
 */
router.post("/update-product", (req, res) => {
  const args = req.body;
  console.log(args);

  // api1
  axios
    .post("http://localhost:8080/stock/update-item", args)
    .then((response) => {
      console.log("Response from api1:", response.data);

      // If api1 responds with a 200 status, call api2
      if (response.status === 200) {
        const args2 = {
          ID_product: args.ID_product,
          Product_name: args.Product_name,
          Product_price: args.Product_price,
          Product_stock: args.Product_quantity,
          Exp_date: args.Expire_date,
          Product_status: args.Product_status,
        };
        // console.log("args2");
        // console.log(args2);
        return axios.post(
          "http://localhost:8080/marketing/update-product",
          args2
        );
      }
    })
    .then((response) => {
      if (response) {
        console.log("Response from api2:", response.data);
        res.status(200).json(response.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(405).json({ err: "ERROR to query" });
    });
});

/**
 * @swagger
 * /service/noti-shipping-cost:
 *    post:
 *      summary: noti shipping cost
 *      tags:
 *        - service
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
router.post("/noti-shipping-cost", (req, res) => {
  const args = req.body;
  console.log(args);

  // api1
  axios
    .post("http://localhost:8080/stock/add-ship-cost", args)
    .then((response) => {
      console.log("Response from api1:", response.data);

      // If api1 responds with a 200 status, call api2
      if (response.status === 200) {
        const args2 = {
          // "ID_shipment":args.ID_shipment,
          Shipping_cost: args.Shipping_cost,
        };
        // console.log("args2");
        // console.log(args2);
        return axios.post(
          "http://localhost:8080/marketing/shipping-cost",
          args2
        );
      }
    })
    .then((response) => {
      if (response) {
        console.log("Response from api2:", response.data);
        res.status(200).json(response.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(405).json({ err: "ERROR to query" });
    });
});

/**
 * @swagger
 * /service/confirm-order:
 *    post:
 *      summary: send confirm order by id
 *      tags:
 *        - service
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
 *                default: 'PD14'
 *
 *      responses:
 *        200:
 *          description: comfirm order complete
 */
router.post("/confirm-order", (req, res) => {
  const args = req.body;
  console.log(args);

  // api1
  axios
    .post("http://localhost:8080/marketing/confirm-order", args)
    .then((response) => {
      console.log("Response from api1:", response.data);

      // If api1 responds with a 200 status, call api2
      if (response.status === 200) {
        const args2 = {
          // "ID_shipment":args.ID_shipment,
          Shipping_cost: args.Shipping_cost,
        };
        // console.log("args2");
        // console.log(args2);
        return axios.post("http://localhost:8080/stock/confirm-order", args);
      }
    })
    .then((response) => {
      if (response) {
        console.log("Response from api2:", response.data);
        res.status(200).json(response.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(405).json({ err: "ERROR to query" });
    });
});

/**
 * @swagger
 * /service/cancel-order:
 *    post:
 *      summary: send confirm order by id
 *      tags:
 *        - service
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
 *                default: 'PD14'
 *
 *      responses:
 *        200:
 *          description: comfirm order complete
 */
router.post("/cancel-order", (req, res) => {
  const args = req.body;
  console.log(args);

  // api1
  axios
    .post("http://localhost:8080/marketing/cancel-order", args)
    .then((response) => {
      console.log("Response from api1:", response.data);

      // If api1 responds with a 200 status, call api2
      if (response.status === 200) {
        const args2 = {
          // "ID_shipment":args.ID_shipment,
          Shipping_cost: args.Shipping_cost,
        };
        // console.log("args2");
        // console.log(args2);
        return axios.post(
          "http://localhost:8080/stock/request-cancel-order",
          args
        );
      }
    })
    .then((response) => {
      if (response) {
        console.log("Response from api2:", response.data);
        res.status(200).json(response.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(405).json({ err: "ERROR to query" });
    });
});

/**
 * @swagger
 * /service/confirm-cancel-order:
 *    post:
 *      summary: send confirm order by id
 *      tags:
 *        - service
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
 *                default: 'PD14'
 *
 *      responses:
 *        200:
 *          description: comfirm order complete
 */
router.post("/confirm-cancel-order", (req, res) => {
  const args = req.body;
  console.log(args);

  // api1
  axios
    .post("http://localhost:8080/stock/cancel-order", args)
    .then((response) => {
      console.log("Response from api1:", response.data);

      // If api1 responds with a 200 status, call api2
      if (response.status === 200) {
        const args2 = {
          // "ID_shipment":args.ID_shipment,
          Shipping_cost: args.Shipping_cost,
        };
        // console.log("args2");
        // console.log(args2);
        return axios.post("http://localhost:8080/marketing/cancel-order", args);
      }
    })
    .then((response) => {
      if (response) {
        console.log("Response from api2:", response.data);
        res.status(200).json(response.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(405).json({ err: "ERROR to query" });
    });
});

/**
 * @swagger
 * /service/order:
 *    post:
 *      summary: Post new order with body
 *      tags:
 *        - service
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
 *              - ID_shipment
 *              - Shipment_cost
 *              - Shipping_company
 *              - Track_no
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
 *              ID_shipment:
 *                type: string
 *                default: SHIP131
 *              Shipment_cost:
 *                type: number
 *                default: 100.0
 *              Shipping_company:
 *                type: string
 *                default: Kerry
 *              Track_no:
 *                type: string
 *                default: IW4NT25L33P
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
router.post("/order", (req, res) => {
  // const args = req.body;
  // const args = { order: req.body };
  const args = req.body;
  console.log(args);

  // api1
  axios
    .post("http://localhost:8080/marketing/order", args)
    .then((response) => {
      console.log("Response from api1:", response.data);

      // If api1 responds with a 200 status, call api2
      if (response.status === 200) {
        console.log("success to add marketing");
        // const args2 = {
        //     // "ID_shipment":args.ID_shipment,
        //     "Shipping_cost":args.Shipping_cost
        // }
        // args2 = req.body
        // console.log(args);
        //       console.log(args.details)
        //       console.log('dafaq');
        //       const orderDetail = args.details.map(detail => [
        //         detail.ID_product,
        //         detail.Product_name,
        //         detail.Product_description,
        //         detail.Amount,
        //         detail.Unit_Price,
        //         detail.Discount,
        //         detail.Total_price,
        //     ]);
        // //  {"ID_product":"PD10","Product_name":"Product Name 1","Product_description":"Description of Product 1","Product_quantity": 1,"Product_price": 49900.0,"Discount": 1000.0,"Total_price": 48900.0},

        //     console.log('order detail is come');
        //     console.log(orderDetail);

        const orderDetailObjects = args.details.map((detail) => ({
          ID_product: detail.ID_product,
          Product_name: detail.Product_name,
          Product_description: detail.Product_description,
          Product_quantity: detail.Amount,
          Product_price: detail.Unit_Price,
          Discount: detail.Discount,
          Total_price: detail.Total_price,
        }));

        const args2 = {
          ID_shipment: args.ID_shipment,
          ID_order: args.ID_order,
          Name: args.Name,
          Address: args.Address,
          Tel: args.Tel,
          Order_date: args.Order_date,
          Sent_date: args.Sent_date,
          Total_Price: args.Total_Price,
          Discount: args.Discount,
          Vat: args.Vat,
          Shipment_cost: args.Shipment_cost,
          Shipping_company: args.Shipping_company,
          Track_no: args.Track_no,
          Net_balance: args.Net_balance,
          details: orderDetailObjects,
        };

        // console.log("args2");
        // console.log(args2);
        return axios.post("http://localhost:8080/stock/order", args2);
      }
    })
    .then((response) => {
      if (response) {
        console.log("Response from api2:", response.data);
        res.status(200).json(response.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(405).json({ err: "ERROR to query" });
    });
});

module.exports = router;
