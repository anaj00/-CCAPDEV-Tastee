import { Router } from 'express';   
import restaurantRouter from "./restaurant.js" 
import userRouter from "./user.js" 
import sign_inRouter from "./sign_in.js" 

import restaurantsOP from "../../models/restaurants.js";
const router = Router();

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// TODO: Create user object account

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
    // Site pages

    // Homepage
    router.get("/", async (req, res, next) => {
        const userArr = req.app.locals.user;
        const user = userArr[0];
        console.log("Request to root received.");
        
        const restaurants = await restaurantsOP.find({}).lean();
        // console.log("Restaurants: ", restaurants);
        
        res.render("index", {
            user: user,
            restaurants: restaurants,
            value: 1
        });
    })
    
    // Restaurant page
    router.use("/restaurant", restaurantRouter)
     


    // User page
    router.use("/user", userRouter);
    // router.get("/user", (req,res) => {
    //     console.log("Request to root received.");
    //     res.render("user", {
    //         name: "Jason"
    //     }
    //     )
    // })

    // User page
    router.use("/sign_in", sign_inRouter);

    // router.get("/sign_in", (req,res) => {
    //     console.log("Request to root received.");
    //     res.render("sign_in")
    // })

export default router;