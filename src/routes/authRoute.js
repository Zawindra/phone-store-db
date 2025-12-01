import express from "express";
import { registerHandler, loginHandler } from "../controllers/authController.js";

const authRouter = express.Router();

// REGISTER
authRouter.post("/auth/register", registerHandler);

// LOGIN (DITAMBAHKAN)
authRouter.post("/auth/login", loginHandler);

export default authRouter;
