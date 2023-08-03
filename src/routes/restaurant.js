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
import commentsOP from "../../models/comments.js";

const router = express.Router();

// TODO: Find a way to retrieve all comments of each review
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

router.post("/:restaurant_id/:review_id/comment", async (req, res) => {
    const review_id = req.params.review_id;
    const restaurant_id = req.params.restaurant_id;
    const result = await reviewsOP.find({review_id: review_id}).lean();
    const review = result[0];

    const highestCommentId =  await commentsOP.findOne().sort("-comment_id");
    const id = highestCommentId ? highestCommentId.review_id + 1 : 1;
    
    // Gets user
    const userArr = req.app.locals.user;
    const user = userArr[0];

    console.log(req.body);
    await commentsOP.create({
        comment_id: id,
        username: user.username,
        username_replied: review.username,
        review_id: review_id,
        restaurant_id: restaurant_id,
        content: req.body.content,
    })
    .then( () => {
        console.log("Insert comment successful: " + user);
        res.sendStatus(200);
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

router.patch("/:restaurant_id/:review_id/edit", async (req,res) => {
    try{
        const review_id = req.params.review_id;
        const updatedData = req.body;
        const filter = {review_id: review_id};
        const updatedOperation = {$set: updatedData}

        const result = await reviewsOP.updateOne(filter, updatedOperation);
        if (result.modifiedCount === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    } catch (error) {
        console.error('Error updating document:', error);
        res.sendStatus(500);
    }
});

router.patch("/:restaurant_id/:review_id/upvote", async (req,res) => {
    try{
        const review_id = req.params.review_id;
        const filter = {review_id: review_id};
        const updatedOperation = {$inc: {upvote_count: 1}}

        const result = await reviewsOP.updateOne(filter, updatedOperation);
        if (result.modifiedCount === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    } catch (error) {
        console.error('Error updating document:', error);
        res.sendStatus(500);
    }
});

router.patch("/:restaurant_id/:review_id/downvote", async (req,res) => {
    try{
        const review_id = req.params.review_id;
        const filter = {review_id: review_id};
        const updatedOperation = {$inc: {downvote_count: 1}}

        const result = await reviewsOP.updateOne(filter, updatedOperation);
        if (result.modifiedCount === 1) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    } catch (error) {
        console.error('Error updating document:', error);
        res.sendStatus(500);
    }
});

router.delete("/:restaurant_id/:review_id/delete", async (req,res) => {
    const review_id = req.params.review_id;
    console.log(review_id);
    const filter = {review_id: review_id}
    const result = await reviewsOP.deleteOne(filter);
    if (result.deletedCount === 1) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});



// Export
export default router;





