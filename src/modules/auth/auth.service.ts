import { pool } from "../../config/database"
import bcrypt from "bcryptjs"


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

    return { user }

}

export const authServices = {
    signinUser,

}