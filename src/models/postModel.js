import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const Blog = mongoose.models.blogs || mongoose.model("blogs", BlogSchema);

export default Blog;