import { mongoose } from "mongoose"
import { getDb } from "../src/db/conn.js";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

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
        default: 'blank_user.webp',
    },
    bio: {
        type: String,
        default: '',
    }
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password"))
        return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch(err){
        console.error(err);
        return next(err);
    }
});

userSchema.method("comparePassword", function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
});

const usersOP = mongoose.model("users", userSchema);
export default usersOP;



