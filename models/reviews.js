import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    review_id: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    restaurant_id: {
        type: Number,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
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
    rating_given: {
        type: Number,
        required: true,
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

const reviewsOP = mongoose.model('Review', reviewSchema);

export default reviewsOP;

