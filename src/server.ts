import express, { Request, Response } from "express";
import { config } from "./config";
import initDB from "./config/database";
import { usersRoutes } from "./modules/users/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehiclesRoute } from "./modules/vehicles/vehicles.route";
const app = express();
const port = config.port;

app.use(express.json());

// DATABASE
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

//------------------signup user--------------------
app.use('/api/v1/auth', usersRoutes);

// get all users - admin only -

// update users(put) - admin+customer

// delete user adminOnly


//------------------signin user--------------------
app.use('/api/v1/auth', authRoutes);



//------------------vehicle-------------------------
app.use('/api/v1/vehicles', vehiclesRoute);


app.listen(port, () => {
  console.log(`Running on: https://localhost:${port}`)
})
