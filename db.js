const { Pool } = require('pg');
const dotenv = require('dotenv').config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

/*const pool = new Pool({
    user: 'postgres',
    password: '1015412015Af',
    host: 'localhost',
    port: 5432,
    database: 'tme_soluciones',
});*/

module.exports = {pool};