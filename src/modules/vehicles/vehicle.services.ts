import { pool } from "../../config/database";
import getVehicleFrBookings from "../../ulties/getVehiclesFrBooking";

const createVehicle = async(vehicle_name: string, type: string, registration_number: string, daily_rent_price: string, availability_status: string) => {
    const result = await pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result.rows[0];
}

const getVehicles = async() => {
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result;
}

const getVehicleById = async(id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
    return result;
}

const updateVehicleById = async(id: string, vehicle_name: string, type: string, registration_number: string, daily_rent_price: string, availability_status: string) => {
    // we make option field using COALESCE
    const result = await pool.query(`
        UPDATE vehicles 
        SET vehicle_name = COALESCE($2, vehicle_name),
         type = COALESCE($3, type),
         registration_number = COALESCE($4, registration_number),
         daily_rent_price = COALESCE($5, daily_rent_price),
         availability_status = COALESCE($6, availability_status)
        WHERE id = $1
        RETURNING *`, [id, vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result;
}

const deleteVehicle = async(id: string) => {
    // if the vehicle is active book do not give permission for delete
    const vehicle = await getVehicleFrBookings(id);

    if (!vehicle) {
    throw new Error("Vehicle not found!");
  }

    if(vehicle.availability_status === "booked"){
        throw new Error("Cant be deleted! its booked!");
    }
    const result = await pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
    return result.rows[0];
}

export const vehicleServices = {
    createVehicle,
    getVehicles,
    getVehicleById,
    updateVehicleById,
    deleteVehicle,

}

