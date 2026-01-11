import jwt from "jsonwebtoken";
import {User} from '../models/User.ts';
import type {Request, Response} from "express";
import type {IUser} from "../models/User.ts";

export const getAllUsers = async (req: Request, res : Response) => {
    return res.json( {success: true, ...await User.find()} );
}

export const registerUser = async (req: Request, res : Response) => {
    if (req.cookies.email) return res.json({success: false, message: "You are already logged in"});
    const {name, email, password} = req.body;
    try {
        const isAlreadyRegistered = await User.findOne({email: email})
        if (isAlreadyRegistered) return res.json({success: false, message: "User already exists"});

        let user;
        if (req.body.role) user = new User({name, email, password, role: req.body.role})
        else user = new User({name, email, password})
        await user.save();

        const token = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET!, {expiresIn: '7d'});
        res.cookie("email", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true, message: "User successfully registered"});
    }
    catch (error) {
        console.log(error);
        return res.json({success: false, message: "internal server error"});
    }
}

export const loginUser = async (req: Request, res : Response) => {
    if (req.cookies.email) return res.json({success: false, message: "You are already logged in"});
    const {email, password} = req.body;
    try {
        const user: IUser | null = await User.findOne({email: email}) ;

        if (!user || ! ( user.isPasswordValid(password) ))
            return res.json({success: false, message: "Email or password is incorrect"});

        const token = jwt.sign({
            email: user.email
        }, process.env.JWT_SECRET!, {expiresIn: "7d"});
        res.cookie("email", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({success: true, message: "User successfully logged in"});
    }
    catch (error) {
        console.log(error);
        return res.json({success: false, message: "internal server error"});
    }
}

export const logoutUser = async (req: Request, res : Response) => {
    res.clearCookie("email");
    return res.json({success:true, message: "Logged out"});
}

export const getProfile = async (req: Request, res : Response) => {
    const token = req.cookies.email
    if (!token) return res.json({success:false, message: "user not logged in"});
    //todo: dont use any below
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    try {
        const user = await User.findOne({email: decoded.email})
        if (!user) return res.json({success: false, message: "user not found"});
        return res.json({ success:true, name: user.name, email: user.email});
    }
    catch (error) {
        console.log(error);
        return res.json({success: false, message: "internal server error"});
    }
}