import { pool } from "../../config/database";
import bcrypt from "bcryptjs";


const createUser = async(name: string, email: string, password: string, phone: string, role: string) => {

    // validate password(6 char)
    if(password.length < 6){
        throw new Error("Password must be at least 6 characteristics!");
        
    }

    // hashed pass -> insert
    const hashedPass = await bcrypt.hash(password, 10);

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role]);
    return result;
}

export const userServices = {
    createUser,

}