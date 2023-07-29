//database
import { getDb } from "./conn.js";

//mongoose schemas
import  userOP  from "../../models/user.js";
import  restaurantOP  from "../../models/restaurants.js";
import  reviewsOP  from "../../models/reviews.js";
import  commentsOP  from "../../models/comments.js";


//mongoose fetch operation constants
const queryUserDb = userOP; //users database
const queryCommentsDb= commentsOP; //comments database
const queryReviewsDb = reviewsOP; //reviews database
const queryRestaurantDb = restaurantOP; //restaurant database

// set mongoose operations to return leaned values
// queryUserDb.setOptions({ lean: true}); 
// queryCommentsDb.setOptions({ lean: true}); 
// queryReviewsDb.setOptions({ lean: true}); 
// queryRestaurantDb.setOptions({ lean: true}); 



// constant declarations
const db = getDb(); 

export async function initializeDbContents(){
    // TODO: implement required number of base entries per collection in the database

    // // Restaurants
    // await insertNewRestaurant("Mcdonalds", "27 Bristol St.", "mcdo.png", "mcdo_static.webp", 1234567);
    // await insertNewRestaurant("Tokyo Tokyo", "52 Gov A. Santos Ave.", "tokyotokyo_header.jpg", "tokyotokyo_static.webp", 65432310);
    // await insertNewRestaurant("Jollibee", "104 Dunedin Corner Regalado Ave.", "jollibee_header.jpg", "jabee_static.webp", 9384039283);
    // await insertNewRestaurant("Mang Inasal", "999 Ampol St.", "manginasal_header.jpg", "manginasal_static.webp", 5555555);
    // await insertNewRestaurant("Kenny Rogers", "2 Taft Avenue", "kennyrogers_header.jpg", "kennyrogers_static.webp", 93840234);

    // // Users
    // await insertNewUser('Nootie', 'NOOTIE11111');
    // await insertNewUser('Oinkie','MAMA MO');

}   
 
export async function insertNewUser(username, pw){
    await userOP.create({
        username: username,
        password: pw,
    }).then( () => {
        console.log("Insert user sucessful: " + username);
    }).catch((err) =>{
        console.log(err);
    })
}

export async function insertNewReview(user, restaurant, title, content, rating){
    const highestReviewId =  await reviewsOP.findOne().sort("-review_id");
    const id = highestReviewId ? highestReviewId.review_id + 1 : 1;

    await reviewsOP.create({
        review_id: id,
        username: user.username,
        restaurant_id: restaurant.restaurant_id,
        title: title,
        content: content,
        rating_given: rating
    })
    .then( () => {
        console.log("Insert review successful: " + user);
    })
    .catch( (err) =>{
        console.log(err);
    })
}

export async function insertNewComment(restaurant, username, replied_to, content){
    const userObj = await userOP.where('username').equals(username).exec();
    const user_repliedObj = userOP.where('username').equals(replied_to).exec();

    const highestId =  await commentsOP.findOne().sort('-comment_id');
    const id = highestId ? highestId.comment_id + 1 : 1;

    const restaurantObj = await queryRestaurantDb.where('name').equals(restaurant).exec();
    await commentsOP.create({
        username: userObj[0].username,
        comment_id: id,
        restaurant: restaurantObj[0].id,
        content: content,
        user_replied: user_repliedObj[0].username
    })
    .then(() => {
        console.log("Insert comment successful: " + id);
    })
    .catch( (err) =>{
        console.log(err);
    })
}

export async function insertNewRestaurant(restaurantName, address, banner_path, icon_path, contact){
    const highestId =  await restaurantOP.findOne().sort('-restaurant_id');
    const id = highestId ? highestId.restaurant_id + 1 : 1;

    await restaurantOP.create({
        restaurant_id: id,
        name: restaurantName, 
        address: address,
        banner: banner_path,
        contact: contact,
        icon: icon_path
    })
    .then(() => {
        console.log("Insert restaurant successful: " + restaurantName);
    })
    .catch( (err) =>{
        console.log(err);
    })
}

export default insertNewReview;