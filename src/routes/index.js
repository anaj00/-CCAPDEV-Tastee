import { Router } from 'express';   
import restaurantRouter from "./restaurant.js" 
import userRouter from "./user.js" 
import sign_inRouter from "./sign_in.js" 

import restaurantsOP from "../../models/restaurants.js";
const router = Router();

    router.get("/", async (req, res, next) => {
        if (req.session.authorized){
            console.log("Request to root received.");
            
            const restaurants = await restaurantsOP.find({}).lean();
            
            res.render("index", {
                user: req.session.user,
                restaurants: restaurants,
                value: 1
            });
        } else {
            res.redirect("/sign_in");
        }
    })
    
    router.use("/restaurant", restaurantRouter)
  
    router.use("/user", userRouter);
    
    router.use("/sign_in", sign_inRouter);

    router.get("/logout", (req, res) => {
        req.session.destroy();
        res.redirect("/sign_in");
    })

export default router;