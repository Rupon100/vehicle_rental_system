import { Request, Response } from "express";
import { pool } from "../../config/database";
import { bookingService } from "./booking.service";

// Create a new booking with automatic price calculation and vehicle status update
const createBooking = async(req: Request, res: Response) => {
    try {
        const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;

        const result = await bookingService.createBooking(customer_id, vehicle_id, rent_start_date, rent_end_date);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result
        })
    }catch(err: any){
        res.status(500).json({
        success: false,
        message: err.message,
    });
    }
}


export const bookingController = {
    createBooking,

}
