module.exports = {
    type: 'object',
    properties: {
        age: {
            type: 'number'
        },
        image: {
            type: 'string'
        },
        experience: {
            type: 'string'
        },
        distance: {
            type: 'number'
        },
        description: {
            type: 'string'
        },
        walks: {
            type: 'number'
        },
        rating: {
            type: 'number'
        },
        hourlyRate: {
            type: 'number'
        }
    },
    additionalProperties: true
};