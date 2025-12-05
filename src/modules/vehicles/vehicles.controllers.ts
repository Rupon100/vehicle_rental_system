import { Request, Response } from "express";
import { pool } from "../../config/database";
import { vehicleServices } from "./vehicle.services";

const createVehicle = async(req: Request, res: Response) => {
    try{
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
        const result = await vehicleServices.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status)
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })

    }catch(err:  any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getVehicles = async(req: Request, res: Response) => {
    try{
        const result = await vehicleServices.getVehicles();
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const vehiclesControllers = {
    createVehicle,
    getVehicles,

}
