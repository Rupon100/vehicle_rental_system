import { pool } from "../../config/database"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "../../config";


const signinUser = async(email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    if(result.rows.length === 0){
        return null;
    }
    
    const user = result.rows[0];
    const isMatched = await bcrypt.compare(password, user.password);

    if(!isMatched){
        return null;
    }

    // jwt signin - token create
    const token = jwt.sign({name: user.name ,email: user.email, role: user.role}, config.jwtSecret as string, {
        expiresIn: '2d'
    })

    // console.log("token from auth service: ", token);

    return { token, user }

}

export const authServices = {
    signinUser,

}