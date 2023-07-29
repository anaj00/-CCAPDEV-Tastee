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

//set mongoose operations to return leaned values
// queryUserDb.setOptions({ lean: true}); 
// queryCommentsDb.setOptions({ lean: true}); 
// queryReviewsDb.setOptions({ lean: true}); 
// queryRestaurantDb.setOptions({ lean: true}); 



//constant declarations
const db = getDb(); 

export async function initializeDbContents(){
    //TODO: implement required number of base entries per collection in the database

    // await insertNewUser('Nootie', 'supersecret password');

    // await insertNewRestaurant('macas in pajamas', 'Talongie st.', './public/images/puga.jpeg');
    // await insertNewRestaurant('Oinkery', 'Oinkery St.', './public/images/puga.jpeg');
    // await insertNewRestaurant('Talongie bakery', 'estrada st.', './public/images/puga.jpeg');



    // await insertNewUser('Oinkie','MAMA MO');
    // const testies = await queryUserDb.where('username').equals("Nootie").exec();
    // console.log(testies[0]._id + " hi");

  

    // const testies = await queryRestaurantDb.where('name').equals("macas in pajamas").exec();
    // if (testies.length > 0) {
    //     console.log(testies[0]._id + " hi");
    //   } else {
    //     console.log("No restaurant found with the name 'macas in pajamas'");
    //   }
    // await insertNewReview('Nootie', 'macas in pajamas', 'MAMA MO TALONG', 'WALANG NUGGETS!', 69);
   
    //await insertNewComment('macas in pajamas', 'Oinkie', 'Nootie', 'Auq na dito');
}   

export async function insertNewUser(username, pw){
    await userOP.create({
        username: username,
        password: pw,
    }).then( () => {
        console.log("Insert Op sucessful: " + username);
    }).catch((err) =>{
        console.log(err);
    })
}

export async function insertNewReview(username, restaurant, title, content, rating){
    const highestReviewId =  await reviewsOP.findOne().sort("-review_id");
    const id = highestReviewId ? highestReviewId.review_id + 1 : 1;
    console.log(restaurant);
    await reviewsOP.create({
        review_id: id,
        user: {
            username: username.username,
            password: username.password,
            date_created: username.date_created,
            pfp: username.pfp,
            bio: username.bio
        },
        restaurant: {
            restaurant_id: restaurant.restaurant_id,
            name: restaurant.name,
            address: restaurant.address,
            average_rating: restaurant.average_rating,
            banner: restaurant.banner,
            icon: restaurant.icon, 
            contact: restaurant.contact
        },
        title: title,
        content: content,
        rating_given: rating
    })
    .then( () => {
        console.log("Insert Op successful: " + username);
    })
    .catch( (err) =>{
        console.log(err);
    })
}

export async function insertNewComment(restaurant, username, replied_to, content){
    const userObjectIDQuery = userOP.where('username').equals(username);
    const userObjectID = await userObjectIDQuery.exec();
    const repliedObjectIdQuery = userOP.where('username').equals(replied_to);
    const repliedObjectId = await repliedObjectIdQuery.exec();

    const highestId =  await commentsOP.findOne().sort('-comment_id');
    const id = highestId ? highestId.comment_id + 1 : 1;
    console.log(id);
    const restaurantObjectId = await queryRestaurantDb.where('name').equals(restaurant).exec();
    await commentsOP.create({
        user: userObjectID[0]._id,
        comment_id: id,
        restaurant: restaurantObjectId[0]._id,
        content: content,
        user_replied: repliedObjectId[0]._id
    })
    .then(() => {
        console.log("Insert Comment Successful: " + id);
    })
    .catch( (err) =>{
        console.log(err);
    })
}

export async function insertNewRestaurant(restaurantName, address, banner_path){
    const highestId =  await restaurantOP.findOne().sort('-restaurant_id');
    const id = highestId ? highestId.restaurant_id + 1 : 1;

    await restaurantOP.create({
        restaurant_id: id,
        name: restaurantName, 
        address: address,
        banner: banner_path
    })
    .then(() => {
        console.log("Insert Restaurant Successful: " + restaurantName);
    })
    .catch( (err) =>{
        console.log(err);
    })
}

export default insertNewReview;