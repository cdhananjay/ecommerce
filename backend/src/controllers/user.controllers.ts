import jwt from "jsonwebtoken";
import {User} from '../models/User.ts';
import type {Request, Response} from "express";
import type {IUser} from "../models/User.ts";

export const getAllUsers = async (req: Request, res : Response) => {
    res.json( await User.find() );
}

export const registerUser = async (req: Request, res : Response) => {
    if (req.cookies.token) {
        res.send("already logged in");
        return;
    }
    const {name, email, password} = req.body;

    try {
        const preUser = await User.findOne({email: email})
        if (preUser) {
            res.send("email already registered");
            return;
        }
        let user;
        if (req.body.role) {
            user = new User({name, email, password, role: req.body.role})
        }
        else user = new User({name, email, password})
        await user.save();
        const token = jwt.sign(user.email, process.env.JWT_SECRET!);
        res.cookie("token", token);
        res.send("successfully registered");
    }
    catch (error) {
        console.log("error creating user", error);
    }
}

export const loginUser = async (req: Request, res : Response) => {
    if (req.cookies.token) {
        res.send("already logged in");
        return;
    }
    const {email, password} = req.body;
    try {
        const user: IUser | null = await User.findOne({email: email}) ;
        if (!user) {
            res.send("either email or password is incorrect");
            return;
        }
        if ( !(user.isPasswordValid(password)) ) {
            res.send("either email or password is incorrect");
            return;
        }
        const token = jwt.sign(user.email, process.env.JWT_SECRET!);
        res.cookie("token", token);
        res.send("successfully logged in");
    }
    catch (error) {
        console.log("error during login", error);
    }

}

export const logoutUser = async (req: Request, res : Response) => {
    res.clearCookie("token");
    res.send("logged out");
}

export const getProfile = async (req: Request, res : Response) => {
    const token = req.cookies.token
    if (!token){
        res.json({ok: false});
    }
    const userEmail = jwt.verify(token, process.env.JWT_SECRET!);
    try {
        const user = await User.findOne({email: userEmail})
        if (!user) {
            res.send("no user found");
            return;
        }
        res.json({
            ok: true,
            user: user,
        });
    }
    catch (error) {
        res.send(`error fetching profile ${error}`);
    }
}