module.exports = {
    port: 3000,
    jwtSecret: '!!CryptoCat@!!',
    jwtExpirationInSeconds: 60 * 60, // 1 hour
    roles: {
        WALKER: 'walker',
        OWNER: 'owner',
        ADMIN: 'admin'
    }
}