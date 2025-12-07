import { pool } from "../../config/database";
import bcrypt from "bcryptjs";
import getUsersIfBooking from "../../ulties/getUsersIfbooking";


const createUser = async(name: string, email: string, password: string, phone: string, role: string) => {


    // check if any letter is capital
    if (/[A-Z]/.test(email)) {
      throw new Error("Email cannot contain uppercase letters!");
    }


    // validate password(6 char)
    if(password.length < 6){
        throw new Error("Password must be at least 6 characteristics!");
    }

    // hashed pass -> insert
    const hashedPass = await bcrypt.hash(password, 10);

    const result = await pool.query(`INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashedPass, phone, role]);
    return result;
}

// admin only
const getAllUsers = async() => {
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}


const updateUser = async(id:  string, name: string, email: string, phone: string, role: string) => {
   const result = await pool.query(`
        UPDATE users 
        SET name = COALESCE($2, name),
         email = COALESCE($3, email),
         phone = COALESCE($4, phone),
         role = COALESCE($5, role)
        WHERE id = $1
        RETURNING *`, [id, name, email, phone, role]);
        return result;
}

// delete user [ admin only ] only if not active bookings exist
const deleteUser = async(id: string) => {
    // add condition here
   const userExists = await pool.query(
        'SELECT * FROM users WHERE id=$1',
        [id]
    );

    if (userExists.rowCount === 0) {
        throw new Error("User does not exist!");
    }

    const bookingCheck = await pool.query(
        `SELECT * FROM bookings WHERE customer_id=$1 AND status='active'`,
        [id]
    );

    if (bookingCheck.rowCount ?? 0 > 0) {
        throw new Error("Can't delete! User still has active booking!");
    }

    const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
}

export const userServices = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
}