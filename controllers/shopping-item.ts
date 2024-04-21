const express = require('express')
const shoppingItemDatabase = require('../database/shopping-item-mongo.ts')
const queryBuilder = require('../helpers/query-builder.ts')
const {
    validateISO8601,
    validateIDFormat,
    validateCreateItemBody,
} = require('../helpers/input-validator.ts')
import { Request, Response } from 'express'

const router = express.Router()

router.post('/create', async (req: Request, res: Response) => {
    let message = validateCreateItemBody(req.body)

    if (message !== null) {
        res.status(400).send({ error: message })
        return
    }
    const now = new Date()
    req.body.createdAt = now.toISOString()

    let loadedResult = await shoppingItemDatabase.createShoppingItem(req.body)
    res.send(loadedResult)
})

router.put('/update/:id', async (req: Request, res: Response) => {
    if (!validateIDFormat(req.params.id)) {
        res.status(400).send('Id must be 24 character long in hex')
        return
    }

    if (req.body.createdAt !== undefined) {
        res.status(400).send('Variable createdAt cannot be updated')
        return
    }

    let loadedResult = await shoppingItemDatabase.updateShoppingItem(
        req.params.id,
        req.body
    )

    if (!loadedResult) {
        res.status(400).send('No item with id ' + req.params.id)
        return
    }

    res.send(loadedResult)
})

router.get('/list', async (req: Request, res: Response) => {
    // without filter
    if (req.body === undefined) {
        let data = await shoppingItemDatabase.getShoppingItems({})

        res.send({
            data,
        })
        return
    }

    let query = buildFilter(req, res)
    queryBuilder.resetQuery()
    if (query === false) {
        return
    }

    let data = await shoppingItemDatabase.getShoppingItems(query)
    res.send({
        data,
    })
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
    if (!validateIDFormat(req.params.id)) {
        res.status(400).send('Id must be 24 character long in hex')
        return
    }

    let result = await shoppingItemDatabase.deleteShoppingItem(req.params.id)

    if (!result) {
        res.status(404).send({ error: 'No item with id ' + req.params.id })
    } else {
        res.send(result)
    }
})

const buildFilter = (req: Request, res: Response) => {
    if (req.body.state !== undefined) {
        if (Array.isArray(req.body.state)) {
            queryBuilder.queryByState(req.body.state)
        } else {
            res.status(400).send({ error: 'Variable state is not array' })
            return false
        }
    }

    if (req.body.content !== undefined) {
        queryBuilder.queryByContent(req.body.content)
    }

    if (
        req.body.startDateTime !== undefined ||
        req.body.endDateTime !== undefined
    ) {
        if (
            req.body.startDateTime !== undefined &&
            !validateISO8601(req.body.startDateTime)
        ) {
            res.status(400).send({
                error: 'Variable startDateTime is not valid in ISO8601',
            })
            return false
        }

        if (
            req.body.endDateTime !== undefined &&
            !validateISO8601(req.body.endDateTime)
        ) {
            res.status(400).send({
                error: 'Variable endDateTime is not valid in ISO8601',
            })
            return false
        }

        queryBuilder.queryByCreatedAt({
            startDateTime: req.body.startDateTime,
            endDateTime: req.body.endDateTime,
        })

        let query = queryBuilder.query
        return query
    }
}

module.exports = router
