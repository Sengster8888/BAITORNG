const app = require('./app');
const config = require('./config/env');
const pool = require('./database/db');

const startServer = async () => {
    try {
        // Test database connection
        const connection = await pool.getConnection();
        console.log('Connected to MySQL database');
        connection.release();

        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT} in ${config.NODE_ENV} mode`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    }
};

startServer();
