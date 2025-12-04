import { Request, Response } from "express"
import { authServices } from "./auth.service"


const signinUser = async(req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        const result = await authServices.signinUser(email, password);

        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        delete result?.user.password;

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        })
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


export const authControllers = {
    signinUser,

}