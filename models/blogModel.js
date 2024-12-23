import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, "username Required"],
        },
    topic:{
        type: String,
        required:[true, "username Required"],
    },
    Image:{
        type: String,
        required:[true, "email Required"],
        unique: true,
    },
    category:{
        type: String,
        required:[true, "password Required"]
    },
    date:{
        type: Date,
    },

})

const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema)

export default Blog