import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import express from 'express';
import exphbs from 'express-handlebars';

// models
import reviewsOP from "../../models/reviews.js";
import commentsOP from "../../models/comments.js";
import userOP from "../../models/user.js";

const router = express.Router();


router.get("/", async (req, res) => {
    // hardcoded
    const userArr = req.app.locals.user;
    const user = userArr[0];
 
    console.log("Request to root received.");
    
    // Retrieves reviews of the user
    const reviews = await reviewsOP.find({
        "user.username": user.username
    }).lean();

    // Retrieves comments of the user
    const comments = await commentsOP.find({
        "user.username": user.username
    }).lean();

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
        "user.username": userCheck.username
    }).lean();

    console.log(reviews);

    // Retrieves comments of the user
    const comments = await commentsOP.find({
        "user.username": userCheck.username
    }).lean();

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





