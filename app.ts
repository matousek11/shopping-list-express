import express, { Express} from 'express'
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const shoppingItem = require('./controllers/shopping-item')

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/shopping-item', shoppingItem)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})

module.exports = app
