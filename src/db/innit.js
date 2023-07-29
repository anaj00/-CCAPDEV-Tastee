import { getDb } from "./conn.js";
import { initializeDbContents } from "./dboperations.js";
const db = getDb();

export function initializeCollections(){
    db.createCollection("users")
    .then( () =>{
        console.log("Created Table users successfully")
    })
    .catch( err =>{
        if (err.code === 48) {
            console.log("The table users already exists");
          } else {
            console.log("An error occurred:", err);
          }
    });

    db.createCollection("owner_account")
    .then( () =>{
        console.log("Created Table owner_account successfully")
    })
    .catch( err =>{
        if (err.code === 48) {
            console.log("The table owner_account already exists");
          } else {
            console.log("An error occurred:", err);
          }
    });

    db.createCollection("comments")
    .then( () =>{
        console.log("Created Table comments successfully")
    })
    .catch( err =>{
        if (err.code === 48) {
            console.log("The table comments already exists");
          } else {
            console.log("An error occurred:", err);
          }
    });

    db.createCollection("reviews")
    .then( () =>{
        console.log("Created Table reviews successfully")
    })
    .catch( err =>{
        if (err.code === 48) {
            console.log("The table reviews already exists");
          } else {
            console.log("An error occurred:", err);
          }
    });

    db.createCollection("restaurants")
    .then( () =>{
        console.log("Created Table restaurant successfully")
    })
    .catch( err =>{
        if (err.code === 48) {
            console.log("The table restaurant already exists");
          } else {
            console.log("An error occurred:", err);
          }
    });

    db.createCollection("tags")
    .then( () =>{
        console.log("Created Table tags successfully")
    })
    .catch( err =>{
        if (err.code === 48) {
            console.log("The table tags already exists");
          } else {
            console.log("An error occurred:", err);
          }
    });

   initializeDbContents();

}