import { pool } from "../../config/database"
import dateDifferences from "../../ulties/dateDiff";
import getVehicleFrBookings from "../../ulties/getVehiclesFrBooking";
import getCustomerDetails from "../../ulties/getCustomerDetails";


const createBooking = async(customer_id: string, vehicle_id: string, rent_start_date: string, rent_end_date: string) => {
    // add vehicle object ------> delete users if not active bookings

    // booking date manage
    const differDays = dateDifferences(rent_start_date, rent_end_date);
    if(differDays < 1){
        throw new Error("Invalid booking end date!");
        ;
    }


    // vehicle details -> calculate total rent
    const vehicleResult = await getVehicleFrBookings(vehicle_id);
    const vehicle = vehicleResult.rows[0];

    if(!vehicle){
        throw new Error("Vehicle not found!");
    }

    const { vehicle_name, daily_rent_price } = vehicle;

    // total price
    const totalPrice = Number(daily_rent_price)  * differDays;


    // create booking here
    const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice, "active"]
);




    return { ...result.rows[0], total_price: totalPrice, status: "active", vehicle: {
        vehicle_name: vehicle_name,
        daily_rent_price: Number(daily_rent_price)
    }};
}

export const bookingService = {
    createBooking,

}


