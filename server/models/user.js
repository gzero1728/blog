import moment from "moment";
import mongoose from "mongoose";

// Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["MainJuin", "SubJuin", "User"],
        default: "User"
    },
    register_data: {
        type: Date,
        // Date.now 대신 한국 시간 적용을 위해 moment를 사용
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    comments: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post"
            },
            comment_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        }
    ]
})

const User = mongoose.model("user", UserSchema);

export default User;
