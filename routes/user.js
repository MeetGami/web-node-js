// Import necessary modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const session = require('express-session');
const router = express.Router();

var text = "";
var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

for( var i=0; i < 16; i++ )
    text += charset.charAt(Math.floor(Math.random() * charset.length));

const random = text;
// Set up middleware to parse request bodies
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public')); // Serve static files from 'public' directory
router.use(session({
    secret: random, // Change this to a secure random string
    resave: false,
    saveUninitialized: true
}));
// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres', // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'hrmsdemo',
    password: 'meet97gami', // Replace with your PostgreSQL password
    port: 5432,
});




// Login route (GET)
router.get('/login', (req, res) => {
    // res.sendFile(__dirname + 'login.html');
    res.render('login');
});
router.get('/', (req, res) => {
    // res.sendFile(__dirname + 'login.html');
    res.render('login');
});

// Login route (POST)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try
    {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM facebookpagedata WHERE pagename = $1 AND pageid = $2', [username, password]);
        client.release();
        if (result.rows.length > 0)
        {
            //res.send('Login successful!');
            req.session.userId = result.rows[0].id; // Store user ID in session
            req.session.userName = result.rows[0].pagename; // Store user ID in session
            res.redirect('/welcome'); // Redirect to welcome route
            //res.redirect('loggedin.html');
        }
        else
        {
            res.send('Invalid username or password.');
        }
    }
    catch (err)
    {
        console.error('Error during login:', err);
        res.status(500).send('Error during login');
    }
});


// Signup route (GET)
router.get('/signup', (req, res) => {
    //res.sendFile(__dirname + '/signup.html');
    res.render('signup');
});

// Signup route (POST)
router.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;
    try
    {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO facebookpagedata (pagename, pageid, pageaccesstoken) VALUES ($1, $2, $3) RETURNING id', [username, password, email]);
        const userId = result.rows[0].id;
        client.release();
        res.send(`User ${username} with ID ${userId} signed up successfully!`);
    }
    catch (err)
    {
        console.error('Error during signup:', err);
        res.status(500).send('Error during signup');
    }
});


let userid = 0;
// Welcome route
router.get('/welcome', (req, res) => {
    if (req.session.userId)
    {
        userid = req.session.userId;
        username = req.session.userName;
        console.log('userid:', userid);
        //res.sendFile(__dirname + '/loggedin.html',{userid});
        res.render('loggedin',{userid : userid, username:username});
    }
    else
    {
        res.redirect('/login');
        //res.render('login'); // Redirect to login route if not logged in
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err)
        {
            console.error('Error destroying session:', err);
        }
        res.redirect('/login');
        //res.render('/login'); // Redirect to login route after logout
    });
});

router.get('/username', (req, res) => {
    if (req.session.userId) {
        res.json({ username: req.session.userId });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// Start the server
const port = 3000;
// router.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

module.exports = router;