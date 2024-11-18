const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// In-memory storage for tweets
const tweets = [];

// Root route (optional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST /tweets - Create a new tweet
app.post('/tweets', (req, res) => {
    console.log(req.body);
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    const tweet = {
        id: tweets.length + 1,
        content,
        timestamp: new Date(),
    };

    tweets.unshift(tweet);
    res.status(201).json(tweet);
});

// GET /tweets - Retrieve all tweets
app.get('/tweets', (req, res) => {
    res.json(tweets);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

