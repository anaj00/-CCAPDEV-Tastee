import { Router } from 'express';   
import restaurantRouter from "./restaurant.js" 
import userRouter from "./user.js" 
import sign_inRouter from "./sign_in.js" 

import restaurantsOP from "../../models/restaurants.js";
const router = Router();

    router.get("/", async (req, res, next) => {
        const userArr = req.app.locals.user;
        const user = userArr[0];
        console.log("Request to root received.");
        
        const restaurants = await restaurantsOP.find({}).lean();
        
        res.render("index", {
            user: user,
            restaurants: restaurants,
            value: 1
        });
    })
    
    router.use("/restaurant", restaurantRouter)
  
    router.use("/user", userRouter);
    
    router.use("/sign_in", sign_inRouter);

export default router;