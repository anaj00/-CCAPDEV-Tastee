import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
    comment_id: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    username_replied: {
        type: String,
        required: true,
        trim: true
    },
    restaurant_id: {
        type: Number,
        ref: 'restaurants',
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    date_posted: {
        type: Date,
        default: Date.now
    }
})

// Looks at the highest review ID, if its taken, it add +1 to the reviewID to the new one
commentsSchema.pre("save", async function (next) {
    if (!this.comment_id) {
      try {
        const highestCommentID = await this.constructor.findOne().sort("-comment_id");
        this.comment_id = highestCommentID ? highestCommentID.comment_id + 1 : 1;
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
});




const commentsOP = mongoose.model('Comments', commentsSchema);

export default commentsOP;