// Function to create movie cards using jQuery
function displayMovies(movies) {
    const container = $("#movieContainer");
    container.empty();

    movies.forEach((movie) => {
        const movieCard = $("<div>").addClass("movie-card");
       // console.log(movieCard)
        // Add onclick event to redirect to movie details page with query parameters
        movieCard.attr("onclick", `redirectToMovieDetails('${encodeURIComponent(movie.title)}')`);
        const posterImg = $("<img>").attr("src", movie.poster).attr("alt", movie.title).css("border-radius", "5px").css("width", "100%").css("height", "250px").css("object-fit", "cover");
        //console.log(posterImg)
        const movieTitle = $("<div>").text(movie.title).addClass("movie-title").css("text-align", "center").css("margin-top", "10px").css("font-size", "16px").css("font-weight", "bold");
      //  console.log(movieTitle)
        movieCard.append(posterImg, movieTitle);
        container.append(movieCard);
    });
}
// Function to handle redirection to movie details page with query parameters
function redirectToMovieDetails(title) {
    const movieDetailsUrl = `/movie?title=${title}`;
    window.location.href = movieDetailsUrl;
}
// Function to handle the search button click event
function searchMovies() {
    const searchTerm = $("#searchInput").val().trim();
    if (searchTerm !== "") {
        const apiKey = "e0bf414e";
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

        $.ajax({
            url: apiUrl,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.Response === "True") {
         
                    console.log(data)
                    const movies = data.Search.map((movie) => ({
                        title: movie.Title,
                        poster: movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150",
                    }));
                    displayMovies(movies);
                } else {
                   // console.log(data)
                    alert("No movies found!");
                }
            },
            error: function (error) {
                console.log(error);
                alert("Error while fetching movies data.");
            },
        });
    }
}
