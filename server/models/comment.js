import mongoose from "mongoose";
import moment from "moment";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss");
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    creatorName: {
        type: Sting,
    }
});

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;