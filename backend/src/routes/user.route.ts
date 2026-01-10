import express from "express";

import {getAllUsers, getProfile, loginUser, logoutUser, registerUser} from "../controllers/user.controllers.js";
const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser);
userRouter.get("/profile", getProfile)

export default userRouter;