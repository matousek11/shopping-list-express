import { Item } from '../../types/item'


const request = require('supertest')
const app = require('../../app.ts')
const shoppingItemDatabaseService = require('../../database/shopping-item-mongo.ts')

const keys = ['content', 'count', 'state']

describe('Test REST API', () => {
    beforeEach(async () => {
        await shoppingItemDatabaseService.deleteAllShoppingItems()
    })

    const createNewItem = async (item: Item) => {
        return await shoppingItemDatabaseService.createShoppingItem(item)
    }

    const findItem = async (id: number) => {
        return await shoppingItemDatabaseService.getShoppingItems({ _id: id })
    }

    test('POST /shopping-item/create is succesfull', async () => {
        let createObj = {
            content: 'content',
            count: 22,
            state: 'COMPLETE',
        }
        const response = await request(app).post('/shopping-item/create').send(createObj)

        expect(response.status).toBe(200)
        expect(response.body.content).toBe('content')
        expect(response.body.count).toBe(22)
        expect(response.body.state).toBe('COMPLETE')
    })

    for (const key of keys) {
        test('POST /shopping-item/create is succesfull', async () => {
            let createObj: any = {
                content: 'content',
                count: 22,
                state: 'COMPLETE',
            }
            delete createObj[key]
            const response = await request(app).post('/shopping-item/create').send(createObj)
    
            expect(response.status).toBe(400)
            expect(response.body.error).toBe('Variable ' + key + ' is not set')
        })
    }

    test('PUT /shopping-item/update/:id is succesfull', async () => {
        let createObj = {
            content: 'update content',
            count: 19,
            state: 'CANCELLED',
        }
        let state = 'ON_WAY'

        let result = await createNewItem(createObj)
        let id = result._id.toString()

        const response = await request(app)
            .put('/shopping-item/update/' + id)
            .send({ state })
        
        expect(response.status).toBe(200)
        expect(response.body.content).toBe(createObj.content)
        expect(response.body.count).toBe(createObj.count)
        expect(response.body.state).toBe(state)
    })

    test('PUT /shopping-item/update/:id is not succesfull because of wrong length id', async () => {
        let id = '1234512345123451234512'
        let state = 'ON_WAY'

        const response = await request(app)
            .put('/shopping-item/update/' + id)
            .send({ state })
            
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Id must be 24 character long in hex')
    })

    test('PUT /shopping-item/update/:id is not succesfull because of wrong id', async () => {
        let id = '123451234512345123451234'
        let state = 'ON_WAY'

        const response = await request(app)
            .put('/shopping-item/update/' + id)
            .send({ state })
        
        expect(response.status).toBe(400)
        expect(response.body.error).toBe('No item with id ' + id)
    })

    test('GET /shopping-item/list is succesfull', async () => {
        let createObj = {
            content: 'update content',
            count: 19,
            state: 'CANCELLED',
        }

        for (let index = 0; index < 5; index++) {
            await createNewItem(createObj)
        }

        const response = await request(app)
            .get('/shopping-item/list')
            .send()
        
        expect(response.status).toBe(200)
        expect(response.body.data.length).toBe(5)
    })

    test('DELETE /shopping-item/delete/:id is succesfull', async () => {
        let createObj = {
            content: 'item to delete',
            count: 5,
            state: 'ON_WAY',
        }

        let result = await createNewItem(createObj)
        let id = result._id.toString()

        const response = await request(app)
            .delete('/shopping-item/delete/' + id)
            .send()

        expect(response.status).toBe(200)
        expect(response.body.content).toBe(createObj.content)
        expect(response.body.count).toBe(createObj.count)
        expect(response.body.state).toBe(createObj.state)
    })

    test('DELETE /shopping-item/delete/:id is not succesfull because of wrong length id', async () => {
        let id = '1234512345123451234512'
        const response = await request(app)
            .delete('/shopping-item/delete/' + id)
            .send()

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Id must be 24 character long in hex')
    })

    test('DELETE /shopping-item/delete/:id is not succesfull because of wrong id', async () => {
        let id = '123451234512345123451234'
        const response = await request(app)
            .delete('/shopping-item/delete/' + id)
            .send()

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('No item with id ' + id)
    })

    afterAll(async () => {
        await shoppingItemDatabaseService.deleteAllShoppingItems
        
    })
})
