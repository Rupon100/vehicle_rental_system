import { pool } from "../config/database";

const customerDetails = async(customer_id: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [customer_id]);
    return result.rows[0];
}

export default customerDetails;
