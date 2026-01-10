import express from 'express';
import userRouter from "./routes/user.route.js";
const app = express();
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser";
import productsRouter from "./routes/products.route.js";
const port = process.env.PORT || 3000;

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/products", productsRouter);

app.listen(port, () => console.log(`http://localhost:${port}/`));