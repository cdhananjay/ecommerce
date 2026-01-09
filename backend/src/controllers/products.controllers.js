import {Product} from "../models/Product.js";
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.send(products)
    }
    catch (error) {
        console.log("error fetching all products", error);
    }
}

export const addProduct = async (req, res) => {
    const {name, price, image} = req.body;
    try {
        const newProduct = await new Product({ name, price, image });
        await newProduct.save();
        res.send({message: "Product added successfully."});
    }
    catch (error) {
        console.log("error adding the products", error);
    }
}