const {roles} = require('../../config');

module.exports = {
    type: 'object',
    properties: {
        fullName: {
            type: 'string'
        },
        email: {
            type: 'string',
            pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
        },
        password: {
            type: 'string'
        },
        role: {
            type: 'string',
            enum: Object.values(roles)
        }
    },
    required: [
        'fullName',
        'email',
        'password'
    ],
    additionalProperties: true
};