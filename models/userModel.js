import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true, "username Required"],
        unique: true,
    },
    email:{
        type: String,
        required:[true, "email Required"],
        unique: true,
    },
    password:{
        type: String,
        required:[true, "password Required"]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },

})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User