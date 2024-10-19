const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Export both the pool and the query function
module.exports = {
    pool, // Export the pool itself
    query: (text, params) => pool.query(text, params),
};
