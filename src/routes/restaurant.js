import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import express from 'express';
import exphbs from 'express-handlebars';
import restaurantsOP from "./../../models/restaurants.js" ;
import reviewsOP from "./../../models/reviews.js";
import usersOP from "./../../models/user.js";

import {
  initializeDbContents,
  insertNewUser,
  insertNewReview,
  insertNewComment,
  insertNewRestaurant,
} from "../../src/db/dboperations.js"

const router = express.Router();


router.get("/:restaurant_id", async (req, res, next) => {
    const userArr = req.app.locals.user;
    const user = userArr[0];

    // Retrieves restaurants
    const restaurantId = req.params.restaurant_id;
    const result = await restaurantsOP.find({restaurant_id: restaurantId}).lean();
    const restaurant = result[0];

    // Retrieves reviews of the restaurant
    let reviews = await reviewsOP.find({restaurant_id: restaurantId}).lean();
    for (const i in reviews){ // Searches the user via username in restaurants, and inserts it in
        let user = await usersOP.find({username: reviews[i].username}).lean();
        reviews[i].user = user[0];
    }

    if (!restaurant) {
        return res.status(404).send("Restaurant not found");
    }


    res.render('restaurant', 
        {   
            user: user,
            restaurant: restaurant,
            reviews: reviews,
            value: 1
        }
    );
})

router.post("/:restaurant_id", async (req, res) => {
    // Gets restaurant obj
    const restaurantId = req.params.restaurant_id;
    const result = await restaurantsOP.find({restaurant_id: restaurantId}).lean();
    const restaurant = result[0];

    // Gets highest restaurant number
    const highestReviewId =  await reviewsOP.findOne().sort("-review_id");
    const id = highestReviewId ? highestReviewId.review_id + 1 : 1;
    
    // Gets user
    const userArr = req.app.locals.user;
    const user = userArr[0];

    await reviewsOP.create({
        review_id: id,
        username: user.username,
        title: req.body.title,
        rating_given: req.body.star_rating,
        content: req.body.content,
        user: user.username,
        restaurant_id: restaurantId
    })
    .then( () => {
        console.log("Insert review successful: " + user);
        res.redirect("/restaurant/" + restaurantId);
    })
    .catch( (err) =>{
        console.log(err);
        res.sendStatus(400);
    })

});

router.get("/:restaurant_id/:review_id", async (req, res) => {
    const review_id = req.params.review_id;
    const reviewObj = await reviewsOP.find({review_id: review_id}).lean();
    const review = reviewObj[0];
    // console.log(review);
    res.json(review);
})

// Export
export default router;





