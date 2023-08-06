import { MongoClient } from 'mongodb';

const mongoURI = process.env.MONGODB_URI();
const client = new MongoClient(mongoURI);

// Establishes the initial connection
export function connectToMongo(callback){ 
    console.log(mongoURI);
    client.connect().then(client => {
        callback();
    }).catch( err =>{
        callback(err);
    });
};

// Returns an instance of the database
export function getDb(dbName = "Tastee"){
    return client.db(dbName);
}

// For closing the connection properly
function signalHandler(){
    console.log("Closing MongoDB connection");
    client.close();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);