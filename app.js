const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path')
const axios = require('axios')
app.use(cors({
    origin: [
        "http://localhost:3000"
    ]
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the route for the movie details page
app.get('/movie', async (req, res) => {
    const title = decodeURIComponent(req.query.title);
    //console.log(req.query.title)
    //console.log(title)
    console.log(`Searching for movie ${title}`);
    const apiKey = "e0bf414e";
    try {
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
        const response = await axios.get(apiUrl);

        const movie = response.data;
        //throw new Error("HIIIIIIII")
        if (movie.Response === 'True') {
           // console.log(movie)
            res.render('movie-details', { movie }); // Passing the movie data to the EJS view
        } else {
            res.status(404).send('Movie not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movie details');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});