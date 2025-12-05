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

const getVehicleById = async(req: Request, res: Response) => {
    try{
        const id =  req.params.vehicleId;
        const result = await vehicleServices.getVehicleById(id as string);
        console.log(result)
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0]
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// admin only
const updateVehicleById = async(req: Request, res: Response) => {
    try{
        const id =  req.params.vehicleId;
        const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
        const result = await vehicleServices.updateVehicleById(id as string, vehicle_name, type, registration_number, daily_rent_price, availability_status)
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0]
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// delete vehicle [admin only]
const deleteVehicle = async(req: Request, res: Response) => {
    try{
        const id = req.params.vehicleId;
        const result = await vehicleServices.deleteVehicle(id as string);
        console.log(result.rowCount);
        // put it in a condition if rowCount == 1 then delete
        res.status(200).json({
          success: true,
          message: "Vehicle deleted successfully"
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
    getVehicleById,
    updateVehicleById,
    deleteVehicle,

}
