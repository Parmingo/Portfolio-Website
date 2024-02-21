process.on('uncaughtException', (err) => {
    console.log('There was an uncaught error', err);
    process.exit(1);
});

console.log("Starting the database connection script...");

const mysql = require('mysql');

const connection = mysql.createConnection({
    host : "test",
    user : "test",
    password : "test",
    database : "test"
});

connection.connect(err => {
    if(err) {
        console.error("Error connecting " + err.stack);
        return;
    }

    console.log("Connected as ID " + connection.threadId);
});

connection.end();

