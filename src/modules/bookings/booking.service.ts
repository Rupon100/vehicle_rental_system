import { pool } from "../../config/database";
import dateDifferences from "../../ulties/dateDiff";
import getVehicleFrBookings from "../../ulties/getVehiclesFrBooking";
import getCustomerDetails from "../../ulties/getCustomerDetails";


// expire booking automatically
const autoBookingUpdate = async() => {
  await pool.query(`UPDATE bookings SET status = 'returned' WHERE status = 'active' AND rent_end_date::date < CURRENT_DATE`)
}

const createBooking = async (
  customer_id: string,
  vehicle_id: string,
  rent_start_date: string,
  rent_end_date: string
) => {
  // booking date manage
  const differDays = dateDifferences(rent_start_date, rent_end_date);
  if (differDays < 1) {
    throw new Error("Invalid booking end date!");
  }

  // vehicle details -> calculate total rent
  const vehicleResult = await getVehicleFrBookings(vehicle_id);
  const vehicle = vehicleResult;
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

  // update vehicle availability status 
  await pool.query(`UPDATE vehicles SET availability_status = 'booked' WHERE id=$1`, [vehicle_id]);

  // 

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

const getAllBookings = async (role: string) => {

  // auto update bookings returned
  await autoBookingUpdate()

  const result = await pool.query(`SELECT * FROM bookings`);
  const bookings = result.rows;

  if (role === "admin") {
    const populatedBookingsAdmin = await Promise.all(
      bookings.map(async (book) => {
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
            email: customer.email,
          },
          vehicle: {
            vehicle_name: vehicle.vehicle_name,
            registration_number: vehicle.registration_number,
          },
        };
      })
    );

    return populatedBookingsAdmin;
  }

  // customer view
  const customerBookings = await Promise.all(
    bookings.map(async (book) => {
      const vehicle = await getVehicleFrBookings(book.vehicle_id);
      //   const vehicle = vehicleResult.rows[0];

      return {
        id: book.id,
        vehicle_id: book.vehicle_id,
        rent_start_date: book.rent_start_date,
        rent_end_date: book.rent_end_date,
        total_price: Number(book.total_price),
        status: book.status,
        vehicle: {
          vehicle_name: vehicle.vehicle_name,
          registration_number: vehicle.registration_number,
          type: vehicle.type,
        },
      };
    })
  );
  return customerBookings;
};

// role based
const updateBooking = async (role: string, id: string, status: string) => {

  // auto update return login
  await autoBookingUpdate();

  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, id]
  );

  // if not found
  if (result.rowCount === 0) {
    throw new Error("Booking not found!");
  }

  // admin
  if (role === "admin" && status === "cancelled") {
    throw new Error("Admin cannot cancel a booking");
  }

  // customer
  if (role !== "admin" && status === "returned") {
    throw new Error("Customer cannot set returned status");
  }

  const booking = result.rows[0];

  // if marks admin vehicle status will be available
  if (status === "returned" || status === "cancelled") {
    await pool.query(
      `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
      [booking.vehicle_id]
    );
  }

  // for admin
  if (role === "admin") {

    // When booking is marked as "returned" → Vehicle status changes to "available"

    const adminResponse = {
      ...result,
      vehicle: { availability_status: "available" },
    };
    return adminResponse;
  }

  // When booking is "cancelled" → Vehicle status changes to "available"
  // UPDATE VEHICLE STATUS IN VEHICLE TABLE
  return booking;


};

export const bookingService = {
  createBooking,
  getAllBookings,
  updateBooking,
};
