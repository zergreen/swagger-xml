const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerDef'); // Path to your swagger definition file
const routes = require('./routes/router.js'); // Import your router
const stocks = require('./routes/stock.js'); // Import your router
const services = require('./routes/service.js')
const app = express();

// Use the router on the server
app.use('/marketing',routes);
app.use('/stock',stocks);
app.use('/service',services);

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
