import express, { Request, Response } from "express";
import { config } from "./config";
import initDB from "./config/database";
import { usersRoutes } from "./modules/users/user.routes";
const app = express();
const port = config.port;

app.use(express.json());

// DATABASE
initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// users
app.use('/api/v1/auth', usersRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
