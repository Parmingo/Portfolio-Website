require('dotenv').config();
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http'); 
const WebSocket = require('ws'); 
const app = express();
const readLine = require("readline");


app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST'], // Allow only GET and POST HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], 
  }));

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

// Route for displaying JSON data from BlogPosts table
app.get('/api/posts', (req, res) => {
    connection.query('SELECT * FROM BlogPosts', (error, results) => {
        if (error) {
            console.error('Query ERROR:', error);
            res.status(500).json({ error: 'Database QUERY ERROR', details: error.message });
            return;
        }
        res.json(results);
    });
});

// health checking for render
app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });
  

// Create HTTP server from express app
const server = http.createServer(app);

// Attach WebSocket server to the same HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    // Send a JSON-formatted message
    ws.send(JSON.stringify({ message: 'Connected to WebSocket server' }));
});

// Listen on the specified port
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    // readline interface setup
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log('Enter Q to end connection');
    rl.on('line', (input) => {
        if(input.toUpperCase() === 'Q') {
            console.log('Ending connection and exiting...');
            process.exit(0);
        }
    });
});

