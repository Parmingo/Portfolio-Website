

// This is just for testing purposes when I run it in terminal to know the script is starting.
console.log("Starting the database connection script...");

// Error tracking, figuring out what errors are happening while connecting to the database
process.on('uncaughtException', (err) => {
    console.log('There was an uncaught error', err);
    process.exit(1);
});

// Require these two (dotenv so user/password can't be seen on github)
require('dotenv').config();
const mysql = require('mysql');

// Creating connection with the details
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


// Error messages again
connection.connect(err => {
    if(err) {
        console.error("Error connecting " + err.stack);
        return;
    }

    console.log("Connected as ID " + connection.threadId);
});

// End connection
connection.end();

