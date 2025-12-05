import { Router } from "express";
import verify from "../../middleware/verify";
import { bookingController } from "./booking.controllers";

const router = Router();

// create booking [ admin + customer ]
router.post('/', verify('admin', 'customer'), bookingController.createBooking);

export const bookingRoutes = router;

