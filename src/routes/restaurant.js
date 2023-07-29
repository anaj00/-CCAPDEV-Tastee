import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import express from 'express';
import exphbs from 'express-handlebars';
import restaurantsOP from "./../../models/restaurants.js" 
import reviewsModel from "./../../models/reviews.js";

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
    const restaurantId = req.params.restaurant_id;
    // console.log("------------------------", restaurantId);
    const result = await restaurantsOP.find({restaurant_id: restaurantId}).lean();
    const restaurant = result[0];
    // console.log("------------------------", restaurantId.restaurant_id);


    const reviews = await reviewsModel.find({"restaurant.restaurant_id": restaurant.restaurant_id}).lean();
    // console.log("------------------------1", reviews);
    if (!restaurant) {
        // Handle case when the restaurant with the given ID is not found
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

router.post("/:restaurant_id", async (req, res, next) => {
    // console.log(req.body);
    const restaurantId = req.params.restaurant_id;
    const result = await restaurantsOP.find({restaurant_id: restaurantId}).lean();
    const restaurant = result[0];
    // console.log("Restaurant: ", restaurant);

    const title = req.body.title;
    const rating_given = req.body.star_rating;
    const content = req.body.content; 
    // console.log("Title: ", title);
    // console.log("Rating: ", rating_given);
    // console.log("Content: ", content);

    const userArr = req.app.locals.user;
    const user = userArr[0];
    // console.log(user);
    insertNewReview(user, restaurant, title, content, rating_given);
    res.redirect("/restaurant/" + restaurantId);
});

// Export
export default router;





