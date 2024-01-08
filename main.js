const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware (should be above your routes)
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve static files after the session middleware
app.use(express.static(path.join(__dirname, 'public')));



// Set up the connection pool
const pool = new Pool({
    user: 'iqtbqvpacrddxr',
    host: 'ec2-44-206-18-218.compute-1.amazonaws.com',
    database: 'd1k50gss0f1psn',
    password: 'f8d954a78f946cbba2fa4fef4d6acc5140a455b3afc093afb8d2479065bab910',
    port: 5432,
    ssl: {
        rejectUnauthorized: false // This will allow connections to a server with a self-signed certificate.
    }
});

///////////////////////////////

// Registration Endpoint
app.post('/register-endpoint', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const result = await pool.query(
            'INSERT INTO AllUser (Username, Passwordhash) VALUES ($1, $2) RETURNING Id',
            [username, hashedPassword]
        );

        res.status(201).json({ userId: result.rows[0].id, message: 'User created successfully' });
    } catch (error) {
        console.error('Error in registration', error);
        res.status(500).send('Error in user registration');
    }
});

// Login Endpoint
app.post('/login-endpoint', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userResult = await pool.query('SELECT * FROM AllUser WHERE Username = $1', [username]);
        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];
            if (await bcrypt.compare(password, user.passwordhash)) {
                // Set user information in session after successful authentication
                req.session.userId = user.id; // Set the userId in the session
                // Redirect to index.html after successful login
                res.redirect('/index.html');
            } else {
                res.status(401).send('Invalid password');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error in login', error);
        res.status(500).send('Error in user login');
    }
});


///////////////////////////////////////////

// POST endpoint to add a new food record
app.post('/add-food', async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
        return res.status(401).send('User not authenticated');
    }

    try {
        const { foodName, calories, notes } = req.body;

        // Use the userId from the session instead of the request body
        const userref = req.session.userId;

        // SQL query to insert data
        const query = 'INSERT INTO Food (Userref, FoodName, Calories, notes) VALUES ($1, $2, $3, $4)';
        const values = [userref, foodName, calories, notes];

        // Execute the query
        await pool.query(query, values);

        res.status(201).send('Food record added successfully');
    } catch (error) {
        console.error('Error adding food record', error);
        res.status(500).send('Error adding food record');
    }
});




///////////////////////////////////

// GET endpoint to retrieve food records for the logged-in user
app.get('/get-food-records', async (req, res) => {
    // Check if the user is logged in
    if (!req.session.userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        // Retrieve all food entries for the logged-in user
        const result = await pool.query(
            'SELECT * FROM Food WHERE Userref = $1',
            [req.session.userId]
        );

        // Send the result back to the client
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error retrieving food records', error);
        res.status(500).json({ message: 'Error retrieving food records' });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
