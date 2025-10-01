import express from "express";
import { testConnection } from "./config/db.js";
import useRouter from "./routes/usersRoute.js";

// membuat server
const app = express();
const port = 2900;

app.use(express.json());
 
app.use(useRouter);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
  testConnection();
});