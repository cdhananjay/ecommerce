import mongoose, {Schema} from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type: String,
        required: true
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", ProductSchema);