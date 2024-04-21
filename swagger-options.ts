const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Express API with Swagger',
            version: '0.1.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./controllers/*.ts', './swagger/*.ts'],
}

module.exports = options
