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


//-----------------get users-----------------------
app.use('/api/v1', usersRoutes)


//----------------update users--------------
app.use('/api/v1', usersRoutes);


//------------------vehicle-------------------------
app.use('/api/v1/vehicles', vehiclesRoute);

 

//------------------booking--------------------------
app.use('/api/v1/bookings', bookingRoutes)


export default app;