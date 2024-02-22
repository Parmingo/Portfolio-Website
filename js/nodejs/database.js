

require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl  : {
        ca : fs.readFileSync(process.env.DB_SSL)
      }
});

connection.connect(err => {
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    console.log("Connected to PlanetScale!");
});

connection.end();