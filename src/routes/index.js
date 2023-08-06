import { Router } from 'express';  
import path from 'path';

import multer from 'multer';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'file_' + uniqueSuffix + ext);
    }
})

const upload = multer({storage: storage});


import restaurantRouter from "./restaurant.js" 
import userRouter from "./user.js" 
import sign_inRouter from "./sign_in.js" 

import usersOP from "./../../models/user.js";

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
    });

    router.post("/search", async (req, res) => {
        try {
            const search = req.body.search;
            const restaurants = await restaurantsOP.find({ name: { $regex: new RegExp(search, "i") } }).lean();        console.log(search);
            res.json(restaurants);
        } catch {
        res.json("No restaurants that match your query.");
    }
    });

    router.get("/getBio", async (req, res) => {
        console.log(req.session.user.bio);
        try {
            res.json(req.session.user.bio);
        } catch {
            res.json("Cannot accomplish");
        }
    });

    router.patch("/uploadPFP", upload.single("profilePicture"), async (req, res) => {
        try {
            if (!req.file){
                return res.status(400).json({ error: 'No image file provided' });
            }
    
            const username = req.session.user.username;
            const imageName = req.file.filename;
            const filter = {username: username};
            const update = { $set: {pfp: imageName}};
            
            const result = await usersOP.updateOne(filter, update);
    
            console.log(`${result.matchedCount} document(s) matched the filter.`);
            console.log(`${result.modifiedCount} document(s) was/were updated.`);
            req.session.user.pfp = imageName;
            res.sendStatus(200);

        } catch (error){
            console.error("Error uploading document:", error);
            res.sendStatus(403);
        }
    });

    router.patch("/editBio", async (req, res) => {
        console.log("BIO", req.body.bio);
        try {
            if (!req.body.bio){ 
                return res.status(400).json({ error: 'No bio provided' });
            }
    
            const username = req.session.user.username;
            const bio = req.body.bio;
            const filter = {username: username};
            const update = { $set: {bio: bio}};
            
            const result = await usersOP.updateOne(filter, update);
    
            console.log(`${result.matchedCount} document(s) matched the filter.`);
            console.log(`${result.modifiedCount} document(s) was/were updated.`);
            req.session.user.bio = bio;
            res.sendStatus(200);

        } catch (error){
            console.error("Error uploading bio:", error);
            res.sendStatus(403);
        }
    })

export default router;