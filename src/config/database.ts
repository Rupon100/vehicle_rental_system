import { Pool } from "pg"
import { config } from "."

const pool = new Pool({
    connectionString: config.connectionString
});

const initDB = async() => {
    await pool.query(`
        CREATE TABLE 
        `);
}

