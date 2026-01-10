import mongoose, {Schema, Types} from "mongoose";

export type review = {
    content: string;
    author: Types.ObjectId;
}

interface IProduct {
    name: string;
    price: number;
    image: string;
    reviews: Array<review>;
    orderHistory?: Types.ObjectId[];
}

const ProductSchema = new mongoose.Schema<IProduct>({
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
    },
    reviews: [
        {
            content: {
                type: String
            },
            author: {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        }
    ]
}, { timestamps: true });

export const Product = mongoose.model<IProduct>("Product", ProductSchema);