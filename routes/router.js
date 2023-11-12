const { log } = require('console');
const express = require('express')
const router = express.Router();

// In your router.js or wherever you define your Swagger annotations
router.use(express.json());

/**
 * @swagger
 * tags:
 *   - name: main
 *     description: Main endpoints
 *   - name: test
 *     description: Test endpoints
 */

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