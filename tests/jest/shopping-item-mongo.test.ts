import { Item } from "../../types/item"

const shoppingItemDatabase = require('../../database/shopping-item-mongo.ts')

describe('Test CRUD on mongodb', () => {
    beforeEach(async () => {
        await shoppingItemDatabase.deleteAllShoppingItems()
    })

    const createNewItem = async (item: Item) => {
        return await shoppingItemDatabase.createShoppingItem(item)
    }

    const findItem = async (id: number) => {
        return await shoppingItemDatabase.getShoppingItems({ _id: id })
    }

    it('Create new item', async () => {
        const createdItem: Item = {
            content: 'hello',
            count: 22,
            state: 'COMPLETE',
        }

        let result = await createNewItem(createdItem)
        expect(result['content']).toBe(createdItem.content)
        expect(result['count']).toBe(createdItem.count)
        expect(result['state']).toBe(createdItem.state)
    })

    it('Update new item', async () => {
        const createdItem: Item = {
            content: 'helloo',
            count: 22,
            state: 'COMPLETE'
        }
        const updateOfItem = {
            count: 20,
            state: 'COMPLETE'
        }

        let result = await createNewItem(createdItem)
        expect(result['content']).toBe(createdItem.content)
        expect(result['count']).toBe(createdItem.count)
        expect(result['state']).toBe(createdItem.state)

        let id = result._id.toString()
        result = await shoppingItemDatabase.updateShoppingItem(id, updateOfItem)
        expect(result['count']).toBe(updateOfItem.count)
        expect(result['state']).toBe(updateOfItem.state)

        result = await findItem(id)
        result = result[0]
        expect(result['content']).toBe(createdItem.content)
        expect(result['count']).toBe(updateOfItem.count)
        expect(result['state']).toBe(updateOfItem.state)
    })

    it('Get list of items', async () => {
        const createdItem: Item = {
            content: 'hello',
            count: 22,
            state: 'COMPLETE',
        }

        await createNewItem(createdItem)
        createdItem.count = 20
        await createNewItem(createdItem)
        createdItem.count = 18
        await createNewItem(createdItem)

        let result = await shoppingItemDatabase.getShoppingItems()
        expect(result.length).toBe(3)
    })

    it('Delete item', async () => {
        const createdItem: Item = {
            content: 'hello',
            count: 22,
            state: 'COMPLETE',
        }

        let result = await createNewItem(createdItem)
        let id = result._id.toString()

        result = await shoppingItemDatabase.deleteShoppingItem(id)
        expect(result).not.toBe(null)
    })

    afterAll(async () => {
        await shoppingItemDatabase.deleteAllShoppingItems()
    })
})
