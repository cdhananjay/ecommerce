import express from "express";
import {getAllUsers, loginUser, logoutUser, registerUser} from "../controllers/auth.controllers.js";
const authRouter = express.Router();

authRouter.get("/", getAllUsers);
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser)
authRouter.post("/logout", logoutUser);

export default authRouter;