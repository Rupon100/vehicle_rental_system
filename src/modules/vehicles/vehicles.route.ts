import { Router } from "express";
import { vehiclesControllers } from "./vehicles.controllers";
import verify from "../../middleware/verify";

const router = Router();

// create vehicle [only Admin]
router.post('/', verify('admin'),vehiclesControllers.createVehicle);

// get all vehicles [ public api ]
router.get('/', vehiclesControllers.getVehicles);

// get vehicle by ID [ public ]
router.get('/:vehicleId', vehiclesControllers.getVehicleById);

// update vehicle [ admin only ]
router.put('/:vehicleId', vehiclesControllers.updateVehicleById);

// delete vehicle [ admin only ]


export const vehiclesRoute = router;
