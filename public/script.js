// Reference to the form and tweets container
const tweetForm = document.getElementById('tweetForm');
const tweetsContainer = document.getElementById('tweetsContainer');

// Handle form submission
tweetForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page refresh

    // Get the tweet content
    const tweetInput = document.getElementById('tweetInput');
    const content = tweetInput.value.trim();

    if (!content) {
        alert('Tweet cannot be empty!');
        return;
    }

    try {
        // Make POST request to the server
        const response = await fetch('http://localhost:5001/tweets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            const newTweet = await response.json();

            // Add the new tweet to the UI
            const tweetElement = document.createElement('div');
            tweetElement.textContent = `${newTweet.content} - ${new Date(newTweet.timestamp).toLocaleString()}`;
            tweetsContainer.prepend(tweetElement);

            // Clear the input
            tweetInput.value = '';
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to post tweet');
        }
    } catch (error) {
        console.error('Error posting tweet:', error);
        alert('Error posting tweet. Please try again.');
    }
});

// Fetch existing tweets
const fetchTweets = async () => {
    try {
        const response = await fetch('http://localhost:5001/tweets');
        const tweets = await response.json();

        // Render tweets
        tweetsContainer.innerHTML = '';
        tweets.forEach((tweet) => {
            const tweetElement = document.createElement('div');
            tweetElement.textContent = `${tweet.content} - ${new Date(tweet.timestamp).toLocaleString()}`;
            tweetsContainer.appendChild(tweetElement);
        });
    } catch (error) {
        console.error('Error fetching tweets:', error);
    }
};

// Fetch tweets when the page loads
fetchTweets();
