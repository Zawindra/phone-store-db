import express from "express";
import { testConnection } from "./config/db.js";
import useRouter from "./routes/usersRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import productRouter from "./routes/productRoute.js";
import cors from "cors";

// membuat server
const app = express();
const port = 2900;

app.use(cors());
app.use(express.json());
 
app.use(useRouter);
app.use(productRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
  testConnection();
});