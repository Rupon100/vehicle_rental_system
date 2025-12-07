import { Request, Response } from "express";
import { pool } from "../../config/database";
import { bookingService } from "./booking.service";

// Create a new booking with automatic price calculation and vehicle status update
const createBooking = async (req: Request, res: Response) => {
  try {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } =
      req.body;

    const result = await bookingService.createBooking(
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errors: err
    });
  }
};

// get all bookings
const getAllBookings = async (req: Request, res: Response) => {
  try {
    // MAKE A CONDITION BASE ON ADMIN | CUSTOMER
    const role = req.user?.role;
    console.log("current role booking: ", role);
    const result = await bookingService.getAllBookings(role);
    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errors: err
    });
  }
};

// role based update booking
const updateBooking = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role;
    const id = req.params.bookingId;
    const { status } = req.body;
    const result = await bookingService.updateBooking(
      role,
      id as string,
      status
    );
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      errors: err
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};
