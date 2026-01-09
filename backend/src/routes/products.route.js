import express from "express";
import {addProduct, getAllProducts} from "../controllers/products.controllers.js";
const productsRouter = express.Router();

productsRouter.get("/", getAllProducts );
productsRouter.post("/add", addProduct);

export default productsRouter;