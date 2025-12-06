import { Router } from "express";
import verify from "../../middleware/verify";
import { bookingController } from "./booking.controllers";

const router = Router();

// create booking [ admin + customer ]
router.post('/', verify('admin', 'customer'), bookingController.createBooking);

// get all bookings [ admin or customer ]
router.get('/', verify('admin', 'customer'), bookingController.getAllBookings);

// update booking role based
router.put('/:bookingId', verify('admin', 'customer'), bookingController.updateBooking)

// get booking own [ customer ]

export const bookingRoutes = router;

