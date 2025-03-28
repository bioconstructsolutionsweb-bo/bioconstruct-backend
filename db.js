const { Pool } = require('pg');


const pool = new Pool({
    connectionString: "postgres://neondb_owner:npg_31iKPkrhCDMf@ep-nameless-river-acoo1hr7-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require"
})

/*const pool = new Pool({
    user: 'postgres',
    password: '1015412015Af',
    host: 'localhost',
    port: 5432,
    database: 'tme_soluciones',
});*/

module.exports = {pool};