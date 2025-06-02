let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch data from OMDb API
let getMovie = () => {
    let movieName = movieNameRef.value.trim();
    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    if (movieName.length === 0) {
        result.innerHTML = '<h3 class="msg">Please enter a movie name</h3>';
    } else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Response === "True") {
                    result.innerHTML = `
                        <div class="info">
                            <img src="${data.Poster}" class="poster">
                            <div class="movie-data">
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    <img src="star-icon.svg" alt="star" />
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    ${data.Genre.split(",").map(genre => `<div>${genre.trim()}</div>`).join("")}
                                </div>
                                <h3>Plot:</h3>
                                <p class="plot">${data.Plot}</p>
                                <h3>Cast:</h3>
                                <p class="cast">${data.Actors}</p>
                            </div>
                        </div>
                    `;
                } else {
                    result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
                }
            })
            .catch(() => {
                result.innerHTML = '<h3 class="msg">Error Occurred</h3>';
            });
    }
};

// Event listeners
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

// Trigger search on Enter key
movieNameRef.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
