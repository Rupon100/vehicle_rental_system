import { pool } from "../config/database";

 
const getUsersIfBooking = async(customer_id: string) => {
    const result = await pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [customer_id]);
    return result;
}

export default getUsersIfBooking;

