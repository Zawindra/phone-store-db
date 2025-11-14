import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routes/usersRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import productRouter from "./routes/productRoute.js";
import authRouter from "./routes/authRoute.js";
import cors from "cors";

// membuat server
const app = express();
const port = 2900;


app.use(cors());
app.use(express.json());
 
app.use(userRouter);
app.use(productRouter);
app.use(authRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
  testConnection();
});