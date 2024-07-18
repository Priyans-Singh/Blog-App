import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs",
        default: [],
    }],
},{timestamps: true});

const User =  mongoose.models.users || mongoose.model("users", UserSchema);

export default User;