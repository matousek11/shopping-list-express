const {
    validateCreateItemBody,
    validateISO8601,
    validateIDFormat,
} = require('../../helpers/input-validator.ts')

describe('Test validateCreateItemBody', () => {
    const body = {
        content: 'content',
        count: 10,
        state: 'COMPLETE',
    }
    const keys = ['content', 'count', 'state']

    it('Correct case', () => {
        expect(validateCreateItemBody(body)).toBe(null)
    })

    for (const key of keys) {
        it('Incorrect case - missing ' + key, () => {
            let editedBody: any = {
                ...body,
            }
            delete editedBody[key]
            expect(validateCreateItemBody(editedBody)).toBe(
                'Variable ' + key + ' is not set'
            )
        })
    }
})

describe('Test validateISO8601', () => {
    it('Correct ISO case', () => {
        expect(validateISO8601('2024-04-21T13:58:15.135Z')).toBe(true)
    })

    it('Incorrect ISO case', () => {
        expect(validateISO8601('2024-04-21T13:58:15')).toBe(false)
    })
})

describe('Test validateIDFormat', () => {
    it('Correct case', () => {
        expect(validateIDFormat('66251b777dbfbe04a6e6da80')).toBe(true)
    })

    it('Incorrect length', () => {
        expect(validateIDFormat('66777dbfbe04a6e6da80')).toBe(false)
    })
})
