import mongoose, {Schema, Types} from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    address?: string;
    wishlist?: Types.ObjectId[];
    cart?: Types.ObjectId[];
    orderHistory?: Types.ObjectId[];
    isPasswordValid: (password: string) => {}
}

const UserSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true,
        default:"registered-user"
    },
    address: {
        type: String,
    },
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        }
    ],
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        }
    ],
    orderHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product",
        }
    ]
}, { timestamps: true });

UserSchema.pre("save", async function (): Promise<void> {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.isPasswordValid = async function (password: string) : Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model<IUser>("User", UserSchema);