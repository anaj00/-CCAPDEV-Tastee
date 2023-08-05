import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import express from 'express';
import exphbs from 'express-handlebars';

// models
import reviewsOP from "../../models/reviews.js";
import commentsOP from "../../models/comments.js";
import userOP from "../../models/user.js";
import restaurantsOP from "../../models/restaurants.js";

const router = express.Router();


router.get("/", async (req, res) => {
    // hardcoded
    const userArr = req.app.locals.user;
    const user = userArr[0];
 
    console.log("Request to root received.");
    
    // Retrieves reviews of the user
    const reviews = await reviewsOP.find({
        username: user.username
    }).lean();

    // Retrieves restaurant name from each review
    for (const i in reviews){
        const restaurant = await restaurantsOP.find({restaurant_id: reviews[i].restaurant_id}).lean();
        reviews[i].restaurant_name = restaurant[0].name;
    }

    // Retrieves comments of the user
    const comments = await commentsOP.find({
        username: user.username
    }).lean();

    for (const j in comments){
        const restaurant = await restaurantsOP.find({restaurant_id: comments[j].restaurant_id}).lean();
        comments[j].restaurant_name = restaurant[0].name;
    }

    res.render("user", {
            user: user,
            reviews: reviews,
            comments: comments,
            value: 1
        });
    // console.log("Reviews: ", reviews);
    // console.log("Comments: ", comments);

})

router.get("/:username", async (req, res) => {
    const userArr = req.app.locals.user;
    const user = userArr[0];

    console.log("Request to root received.");
    const userCheck1 = req.params.username;
    const userCheck2 = await userOP.find({
        username: userCheck1
    }).lean();
    const userCheck = userCheck2[0];

    // Retrieves reviews of the user
    const reviews = await reviewsOP.find({
        username: userCheck.username
    }).lean();

    for (const i in reviews){
        const restaurant = await restaurantsOP.find({restaurant_id: reviews[i].restaurant_id}).lean();
        reviews[i].restaurant_name = restaurant[0].name;
    }

    // Retrieves comments of the user
    const comments = await commentsOP.find({
        username: userCheck.username
    }).lean();


    for (const j in comments){
        const restaurant = await restaurantsOP.find({restaurant_id: comments[j].restaurant_id}).lean();
        comments[j].restaurant_name = restaurant[0].name;
    }
    console.log(comments);

    res.render("user", {
            userCheck: userCheck,
            user: user,
            reviews: reviews,
            comments: comments,
            value: 1
        });
    // // console.log("Reviews: ", reviews);
    // // console.log("Comments: ", comments);

})

// Export
export default router;





