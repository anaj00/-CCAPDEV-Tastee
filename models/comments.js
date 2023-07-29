import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema({
    comment_id: {
        type: Number,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        trim: true
    },
    user_replied: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
        trim: true
    },
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
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
    },
    upvote_count: {
        type: Number,
        required: true,
        default: 0
    },
    downvote_count: {
        type: Number,
        required: true,
        default: 0
    },
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