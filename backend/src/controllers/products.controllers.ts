import jwt from "jsonwebtoken";
import {Product} from "../models/Product.ts";
import {type IUser, User} from "../models/User.ts";
import type { Request, Response } from "express";

export const getAllProducts = async (req: Request, res : Response) => {
    try {
        const products = await Product.find()
        return res.json({success: true, products: products})
    }
    catch (error) {
        console.log("error fetching all products", error);
        return res.json({success: false, message: "internal server error"});
    }
}

export const addProduct = async (req: Request, res : Response) => {
    const token = req.cookies.email;
    if (!token) return res.json({success:false, message: "user not logged in"});
    //todo: dont use any below
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user: IUser | null = await User.findOne({email: decoded.email})
    if (!user) return res.json({success:false, message: "user not found"}); //invalid cookies
    if (user.role !== "admin") return res.json({success:false, message: "user unauthorized"});
    const {name, price, image} = req.body;
    try {
        const newProduct = new Product({name, price, image});
        await newProduct.save();
        res.json({success:true, message: "Product added successfully."});
    }
    catch (error) {
        console.log("error adding the products", error);
        res.json({success:false, message: "internal server error"});
    }
}