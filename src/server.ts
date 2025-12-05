import express, { Request, Response } from "express";
import { config } from "./config";
import initDB from "./config/database";
import { usersRoutes } from "./modules/users/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehiclesRoute } from "./modules/vehicles/vehicles.route";
import { bookingRoutes } from "./modules/bookings/booking.routes";
const app = express();
const port = config.port;

app.use(express.json());

// DATABASE
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


//------------------signin user--------------------
app.use('/api/v1/auth', authRoutes);




//------------------signup user--------------------
app.use('/api/v1/auth', usersRoutes);

// get all users - admin only -

// update users(put) - admin+customer

// delete user adminOnly



//-----------------get users-----------------------
app.use('/api/v1', usersRoutes)

//----------------update users--------------
app.use('/api/v1', usersRoutes);




//------------------vehicle-------------------------
app.use('/api/v1/vehicles', vehiclesRoute);

// get vehicles by id - its still working
// app.use('/api/v1/vehicles', vehiclesRoute);


//------------------booking--------------------------
app.use('/api/v1/bookings', bookingRoutes)


app.listen(port, () => {
  console.log(`Running on: https://localhost:${port}`)
})
