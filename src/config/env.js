require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_NAME: process.env.DB_NAME || 'baitorng',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    NODE_ENV: process.env.NODE_ENV || 'development'
};
