import mongoose from 'mongoose';
const restaurantSchema = new mongoose.Schema({
    restaurant_id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,   
        trim: true
    },
    address: {
        type: String,
        required: true,
    },
    average_rating: {
        type: Number,
        default: 0,
    },
    banner: {
        type: String,
        default: './public/images/puga.jpeg',
    },
    icon: {
        type: String,
        default: './public/images/puga.jpeg',
    },
    contact: {
        type: Number,
        default: 0
    }
});

const restaurantOP = mongoose.model("restaurant", restaurantSchema);

export default restaurantOP;

