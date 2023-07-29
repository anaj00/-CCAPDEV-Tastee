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

router.post("/:restaurant_id", async (req, res, next) => {
    const restaurantId = req.params.restaurant_id;
    const result = await restaurantsOP.find({restaurant_id: restaurantId}).lean();
    const restaurant = result[0];

    const title = req.body.title;
    const rating_given = req.body.star_rating;
    const content = req.body.content; 

    const userArr = req.app.locals.user;
    const user = userArr[0];

    insertNewReview(user, restaurant, title, content, rating_given);
    res.redirect("/restaurant/" + restaurantId);
});

// Export
export default router;





