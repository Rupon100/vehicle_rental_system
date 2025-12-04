import { Pool } from "pg"
import { config } from "."

export const pool = new Pool({
    connectionString: config.connectionString
});

const initDB = async() => {

    // users
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,  
        phone VARCHAR(20) NOT NULL,
        role VARCHAR(30) NOT NULL
        );
        `);

        // vehicles

        // bookings

}

export default initDB;
