import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
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
    }
}, {timestamps: true});

const Post = mongoose.model.posts || mongoose.model("posts", PostSchema);

export default Post;