import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
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

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.isPasswordValid = async function (password) {
    return bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", UserSchema);