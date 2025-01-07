import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, "title Required"],
        },
    topic:{
        type: String,
        required:[true, "topic Required"],
    },
    Image:{
        type: String,
        required:[true, "Image Required"],
        unique: true,
    },
    category:{
        type: String,
        required:[true, "category Required"]
    },
    isLatest:{
        type: Boolean,
        unique: true,
    },
    isMostRead:{
        type: Boolean,
    },
    isFeatured:{
        type: Boolean,
    },
    date:{
        type: Date,
    },

})

const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema)

export default Blog