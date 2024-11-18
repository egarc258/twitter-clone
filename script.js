// Function to post a tweet

document.getElementById('post-tweet').addEventListener('click', function() {
    const tweetContent = document.getElementById('tweet-content').value;

    if (tweetContent) {
        const tweetDiv = document.createElement('div');
        tweetDiv.classList.add('tweet');
        tweetDiv.innerText = tweetContent;
        document.getElementById('feed').prepend(tweetDiv); // Add tweet to the feed
        document.getElementById('tweet-content').value = ''; // Clear the input
    }
});

// Handle logout (for now just reload to simulate logout)
document.getElementById('logout')?.addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirect to login page
});