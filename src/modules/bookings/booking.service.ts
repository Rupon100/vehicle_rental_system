import { pool } from "../../config/database";
import dateDifferences from "../../ulties/dateDiff";
import getVehicleFrBookings from "../../ulties/getVehiclesFrBooking";
import getCustomerDetails from "../../ulties/getCustomerDetails";

const createBooking = async (
  customer_id: string,
  vehicle_id: string,
  rent_start_date: string,
  rent_end_date: string
) => {
  // add vehicle object ------> delete users if not active bookings

  // booking date manage
  const differDays = dateDifferences(rent_start_date, rent_end_date);
  if (differDays < 1) {
    throw new Error("Invalid booking end date!");
  }

  // vehicle details -> calculate total rent
  const vehicleResult = await getVehicleFrBookings(vehicle_id);
  const vehicle = vehicleResult.rows[0];

  if (!vehicle) {
    throw new Error("Vehicle not found!");
  }

  const { vehicle_name, daily_rent_price } = vehicle;

  // total price
  const totalPrice = Number(daily_rent_price) * differDays;

  // create booking here
  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      "active",
    ]
  );

  return {
    ...result.rows[0],
    total_price: totalPrice,
    status: "active",
    vehicle: {
      vehicle_name: vehicle_name,
      daily_rent_price: Number(daily_rent_price),
    },
  };
};

const getAllBookings = async() => {
    const result = await pool.query(`SELECT * FROM bookings`);
    const bookings = result.rows;


    const populatedBookings = await Promise.all(
        bookings.map(async(book) => {
            const customer = await getCustomerDetails(book.customer_id);
            const vehicle = await getVehicleFrBookings(book.vehicle_id);

            return {
                id: book.id,
                customer_id: book.customer_id,
                vehicle_id: book.vehicle_id,
                rent_start_date: book.rent_start_date,
                rent_end_date: book.rent_end_date,
                total_price: Number(book.total_price),
                status: book.status,
                customer: {
                    name: customer.name,
                    email: customer.email
                },
                vehicle: {
                vehicle_name: vehicle.vehicle_name,
                registration_number: vehicle.registration_number
                }
            }

        })
    )

    return populatedBookings;
 
}

export const bookingService = {
  createBooking,
  getAllBookings,

};
