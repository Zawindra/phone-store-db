import express from "express";
import { createUsersHandler, deleteUsersHandler, getAllUsersHandler, getUserByIdHandler, updateUsersHandler } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUserByIdHandler);
userRouter.post("/users", createUsersHandler);
userRouter.put("/users/:id", updateUsersHandler);
userRouter.delete("/users/:id", deleteUsersHandler);

export default userRouter;