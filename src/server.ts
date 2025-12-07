import app from "./app";
import { config } from "./config";

const port = config.port;


app.listen(port, () => {
  console.log(`Running on: https://localhost:${port}`)
})
