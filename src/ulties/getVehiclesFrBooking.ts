import { pool } from "../config/database";

 
const getVehicleFrBookings = async(vehicle_id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [vehicle_id]);
    return result;
}

export default getVehicleFrBookings;

