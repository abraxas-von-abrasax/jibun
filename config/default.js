require('dotenv').config();

module.exports = {
    server: {
        port: process.env.PORT ?? 4200,
    },
    crypto: {
		saltRounds: process.env.CRYPTO_SALT_ROUNDS ?? 10,
		jwtKey: process.env.JWT_KEY,
		jwtPubKey: process.env.JWT_PUB_KEY,
    },
    db: {
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
    },
};
