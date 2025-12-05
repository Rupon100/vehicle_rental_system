import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";
import verify from "../../middleware/verify";

const router = Router();

// create vehicle [only Admin]
router.post('/', verify('admin'),vehiclesControllers.createVehicle);

// get all vehicles [ public api ]
router.get('/', vehiclesControllers.getVehicles);

export const vehiclesRoute = router;
