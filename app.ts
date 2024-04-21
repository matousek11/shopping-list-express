import express, { Express } from 'express'
const mongoose = require('mongoose'),
    dotenv = require('dotenv'),
    bodyParser = require('body-parser'),
    shoppingItem = require('./controllers/shopping-item'),
    swaggerJsdoc = require('swagger-jsdoc'),
    swaggerUi = require('swagger-ui-express'),
    swaggerOptions = require('./swagger-options.ts')

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/shopping-item', shoppingItem)
  
  const specs = swaggerJsdoc(swaggerOptions);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

const gracefulShutdown = () => {
    mongoose.connection.close()
    console.log('mongoose connection closed')
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

module.exports = app
