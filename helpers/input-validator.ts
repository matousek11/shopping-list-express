function validateCreateItemBody(body: any) {
    const keys = ['content', 'count', 'state']

    for (const key of keys) {
        if (body[key] === undefined) {
            return 'Variable ' + key + ' is not set'
        }
    }

    return null
}

function validateISO8601(dateString: string) {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}\.\d{3})Z$/
    if (regex.test(dateString)) {
        const d = new Date(dateString)
        return !isNaN(d.getTime())
    }
    
    return false
}

function validateIDFormat(id: string) {
    if (id.length !== 24) {
        return false
    }

    return true
}

export { validateISO8601, validateIDFormat, validateCreateItemBody }
