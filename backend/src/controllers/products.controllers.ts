import type { Request, Response } from "express";
import {Product} from "../models/Product.ts";
import jwt from "jsonwebtoken";
import {User} from "../models/User.ts";

export const getAllProducts = async (req: Request, res : Response) => {
    try {
        const products = await Product.find()
        res.send(products)
    }
    catch (error) {
        console.log("error fetching all products", error);
    }
}

export const addProduct = async (req: Request, res : Response) => {
    const token = req.cookies.token;
    if (!token) {
        res.send("user not logged in");
        return
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(decoded);
    const user = await User.findOne({email: decoded})
    if (!user) {
        res.send("user not found");
        return;
    }
    console.log(user.role);
    if (user.role !== "admin") {
        res.send("user unauthorized")
        return
    }
    const {name, price, image} = req.body;
    try {
        const newProduct = new Product({name, price, image});
        await newProduct.save();
        res.send({message: "Product added successfully."});
    }
    catch (error) {
        console.log("error adding the products", error);
    }
}