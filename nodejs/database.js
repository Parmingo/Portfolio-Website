require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const readLine = require("readline");


app.use(express.static(path.join(__dirname, 'public')));


// Setting up readline interface
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// Creating a MySQL connection using the connection string
const connection = mysql.createConnection(process.env.DATABASE_URL);

// Connecting to MySQL
connection.connect(error => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to PlanetScale!');
});

app.use(cors({
    origin: '*', // Allow only this origin to access the resources
    methods: ['GET', 'POST'], // Allow only GET and POST HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
  }));

// Route for displaying JSON data from the Projects table
app.get('/api/projects', (req, res) => {
    connection.query('SELECT * FROM Projects', (error, results) => {
        if (error) {
            console.error('Query ERROR:', error);
            res.status(500).json({ error: 'Database QUERY ERROR', details: error.message });
            return;
        }
        res.json(results);
    });
});

  

// Another route, e.g., '/welcome'
app.get('/welcome', (req, res) => {
    res.send('Welcome to my portfolio API');
});

// Listen on the specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

    // This is to end connection for testing purposes
    console.log('Enter Q to end connection');
    rl.on('line', (input) => {
        if(input.toUpperCase() === 'Q') {
          console.log('Ending connection and exiting...');
          process.exit(0); 
        }
      });
});

