const mongoose = require('mongoose');
//define the mongodb connection url
const mongoURL = 'mongodb://localhost:27017/hotels' //hotels its a DB name

//It is use to set up the connection with mongoose
mongoose.connect(mongoURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

//Get the default connection
//Mongoose maintain a default connection obj representing the mongoDB connection.    
const db = mongoose.connection;

// this are listeners of DB
db.on('connected', () => {
    console.log("Connected to mongodb server");
});

db.on('error', (error) => {
    console.log("Mongo DB connection error: " + error);
});

db.on('disconnected', () => {
    console.log("Mongo DB Disconnected..");
});

db.on('close', () => {
    console.log("Connection closed (possibly due to server down)");
});

//export db obj
module.export = db;