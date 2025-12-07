import { Request, Response } from "express";
import { pool } from "../../config/database";
import { userServices } from "./users.service";


const createUser = async(req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body;
    try{

        const result = await userServices.createUser(name, email, password, phone, role);

        // this means not return password in json
        delete result.rows[0].password;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }
}


// admin only
const getAllUsers = async(req: Request, res: Response) => {
    try{
        const result = await userServices.getAllUsers();
        // remove password
        const users = result.rows.map(user => {
            const { password, ...restUser } = user;
            return restUser;
        })
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }
}

// admin or customer
const updateUser = async(req: Request, res: Response) => {
    try{
        const id = req.params.userId;
        const { name, email, phone, role } = req.body;
        const result = await userServices.updateUser(id as string, name, email, phone, role);
        delete result.rows[0].password;

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }
}

// delete user [ admin only ] only if not active bookings exist
const deleteUser = async(req: Request, res: Response) => {
    try{
        const id = req.params.userId;
        const result = await userServices.deleteUser(id as string);
        // put it in rowCount then send response

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message,
            errors: err
        })
    }
}


export const usersControllers = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    
}
