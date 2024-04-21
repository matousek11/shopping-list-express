const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.DATABASE_URL)

const Schema = mongoose.Schema
const shoppingItemSchema = new Schema({
    id: String,
    content: String,
    count: Number,
    state: String,
    createdAt: String,
})

const ItemModel = mongoose.model('ShoppingItem', shoppingItemSchema)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function () {
    console.log('Connected to MongoDB')
})

class ShoppingItemDatabaseService {
    createShoppingItem = async (body: object) => {
        const item = new ItemModel(body)
        return await item.save()
    }

    updateShoppingItem = async (id: string, item: any) => {
        return await ItemModel.findByIdAndUpdate(id, item, {
            new: true,
        })
    }

    getShoppingItems = async (query = {}) => {
        return await ItemModel.find(query)
    }

    deleteShoppingItem = async (id: string) => {
        return await ItemModel.findByIdAndDelete(id)
    }

    deleteAllShoppingItems = async () => {
        return await ItemModel.deleteMany({})
    }
}

module.exports = new ShoppingItemDatabaseService()
