import jwt from "jsonwebtoken";
import {User} from "../models/User.js";

export const getAllUsers = async (req, res) => {
    res.json( await User.find() );
}

export const registerUser = async (req, res) => {
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
        const user = new User({name, email, password});
        await user.save();
        const token = jwt.sign(user.email, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.send("successfully registered");
    }
    catch (error) {
        console.log("error creating user", error);
    }
}

export const loginUser = async (req, res) => {
    if (req.cookies.token) {
        res.send("already logged in");
        return;
    }
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email: email}) ;
        if (!user) {
            res.send("either email or password is incorrect");
            return;
        }
        if ( !(await user.isPasswordValid(password)) ) {
            res.send("either email or password is incorrect");
            return;
        }
        const token = jwt.sign(user.email, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.send("successfully logged in");
    }
    catch (error) {
        console.log("error during login", error);
    }

}

export const logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.send("logged out");
}