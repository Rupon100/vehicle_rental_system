import { Request, Response } from "express";
import { pool } from "../../config/database";
import { userServices } from "./users.service";


const createUser = async(req: Request, res: Response) => {
    const { name, email, password, phone, role } = req.body;
    try{

        const result = await userServices.createUser(name, email, password, phone, role);

        delete result.rows[0].password;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })

    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



export const usersControllers = {
    createUser,

}
