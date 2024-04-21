const queryBuilder = require('../../helpers/query-builder.ts')

describe('Test of query building', () => {
    it('Query just with state', () => {
        let state = 'COMPLETE'
        let expectedObj = {
            state: { $in: state },
        }

        queryBuilder.queryByState(state)

        expect(queryBuilder.query).toStrictEqual(expectedObj)
    })
    
    it('Query with state and content', () => {
        let state = 'INCOMPLETE'
        let content = 'content text'
        let expectedObj = {
            state: { $in: state },
            content: content
        }

        queryBuilder.queryByState(state)
        queryBuilder.queryByContent(content)

        expect(queryBuilder.query).toStrictEqual(expectedObj)
    })

    it('Query with state, content and startDateTime', () => {
        let state = 'COMPLETE'
        let content = 'content text'
        let startDateTime = '2020-04-21T13:58:15.135Z'
        let dateTimeObj = { startDateTime }
        let expectedObj = {
            state: { $in: state },
            content: content,
            createdAt: { $gte: startDateTime}
        }

        queryBuilder.queryByState(state)
        queryBuilder.queryByContent(content)
        queryBuilder.queryByCreatedAt(dateTimeObj)

        expect(queryBuilder.query).toStrictEqual(expectedObj)
    })

    it('Query with state, content and endDateTime', () => {
        let state = 'COMPLETE'
        let content = 'content text'
        let endDateTime = '2020-04-21T13:58:15.135Z'
        let dateTimeObj = { endDateTime }
        let expectedObj = {
            state: { $in: state },
            content: content,
            createdAt: { $lte: endDateTime}
        }

        queryBuilder.queryByState(state)
        queryBuilder.queryByContent(content)
        queryBuilder.queryByCreatedAt(dateTimeObj)

        expect(queryBuilder.query).toStrictEqual(expectedObj)
    })

    it('Query with state, content, startDateTime and endDateTime', () => {
        let state = 'COMPLETE'
        let content = 'content text'
        let startDateTime = '2020-04-21T13:58:15.135Z'
        let endDateTime = '2024-04-21T13:58:15.135Z'
        let dateTimeObj = { startDateTime, endDateTime }
        let expectedObj = {
            state: { $in: state },
            content: content,
            createdAt: {
                $gte: startDateTime,
                $lte: endDateTime,
            }
        }

        queryBuilder.queryByState(state)
        queryBuilder.queryByContent(content)
        queryBuilder.queryByCreatedAt(dateTimeObj)

        expect(queryBuilder.query).toStrictEqual(expectedObj)
    })

    afterEach(() => {
        queryBuilder.resetQuery()
    })
})