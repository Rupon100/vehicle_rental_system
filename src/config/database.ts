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
        role VARCHAR(30) NOT NULL CHECK (role IN ('admin', 'customer'))
        );
        `);

    // vehicles
    await pool.query(`
        CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(40) NOT NULL,
        type VARCHAR(50) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        registration_number VARCHAR(40) UNIQUE NOT NULL,
        daily_rent_price NUMERIC NOT NULL CHECK ( daily_rent_price > 0), 
        availability_status VARCHAR(30) NOT NULL CHECK (availability_status IN ('available', 'booked'))
        )
        `)

    // bookings
    await pool.query(`CREATE TABLE IF NOT EXISTS bookings(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) ON DELETE CASCADE,
        vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
        rent_start_date VARCHAR(50) NOT NULL,
        rent_end_date VARCHAR(50) NOT NULL,
        total_price NUMERIC NOT NULL CHECK ( total_price > 0 ),
        status VARCHAR(40) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned'))
        )`)

}

export default initDB;
