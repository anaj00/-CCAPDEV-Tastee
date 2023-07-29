import { mongoose } from "mongoose"
import { getDb } from "../src/db/conn.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
    pfp: {
        type: String,
        default: './public/images/puga.jpeg',
    },
    bio: {
        type: String,
        default: '',
    }
});

const userOP = mongoose.model("users", userSchema);
export default userOP;



