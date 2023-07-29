import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import express from 'express';
import exphbs from 'express-handlebars';

const router = express.Router();


router.get("/", (req, res) => {
    console.log("Request to root received.");
    res.render("sign_in", {
        value: 0
    })
})

// Export
export default router;





