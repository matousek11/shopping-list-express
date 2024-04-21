type CreatedAtReq = {
    startDateTime: string | undefined
    endDateTime: string | undefined
}

class QueryBuilder {
    query: {}

    constructor() {
        this.query = {}
    }

    queryByState(filterArray: string[]) {
        this.query = {
            ...this.query,
            state: { $in: filterArray },
        }
        return this
    }

    queryByContent(content: string) {
        this.query = {
            ...this.query,
            content: content,
        }
        return this
    }

    queryByCreatedAt(createdAtBody: CreatedAtReq) {
        if (
            createdAtBody.startDateTime === undefined &&
            createdAtBody.endDateTime === undefined
        ) {
            throw new Error('At least one key should not be undefined')
        }

        let createdAt = {}
        if (createdAtBody.startDateTime !== undefined) {
            createdAt = {
                $gte: createdAtBody.startDateTime,
            }
        }

        if (createdAtBody.endDateTime !== undefined) {
            createdAt = {
                ...createdAt,
                $lte: createdAtBody.endDateTime,
            }
        }

        this.query = {
            ...this.query,
            createdAt,
        }
        return this
    }

    resetQuery() {
        this.query = {}
    }
}

module.exports = new QueryBuilder()
