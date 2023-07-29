import mongoose from "mongoose";


export function connectToMongoose(URI){
    mongoose.connect(URI, {dbName: 'Tastee'})
    .then( () =>{
        console.log("Connected to mongoose Successfully!");
    })
    .catch(err =>{
        console.log("Mongoose failed to Connect to database");
    })
}

