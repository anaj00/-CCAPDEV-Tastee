import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import express from 'express';
import exphbs from 'express-handlebars';

import usersOP from "./../../models/user.js";
const router = express.Router();


router.get("/", (req, res) => {
    console.log("Request to root received.");
    if (req.session.authorized){
        res.redirect("/");
    }
    res.render("sign_in", {
        value: 0
    })
})

router.post("/register", async (req, res) => {
    console.log("Request to register received.");
    
        await usersOP.create({
            username: req.body.username,
            password: req.body.password
        })
        .then (() => {
            console.log("Register user succesful");
            res.redirect("/sign_in");
        }) 
        .catch ((err) => {
            console.log(err);
            res.sendStatus(400);
        })
});

router.post("/sign_in", async (req, res) => {
    console.log("Request to sign in received.");

    const {username, password} = req.body;

    try {
        const foundUser = await usersOP.findOne({ username: username });
        if (!foundUser) {
            console.error("User not found");
            return res.sendStatus(404);
        }

        const isPasswordMatch = await foundUser.comparePassword(password);
        if (!isPasswordMatch) {
            console.error("Password does not match");
            return res.sendStatus(401);
        }
        req.session.user = foundUser;
        req.session.authorized = true;
        res.sendStatus(200);

    } catch (error) {
        console.error("Error occurred during sign in:", error);
        res.sendStatus(500);
    }
});
// Export
export default router;





