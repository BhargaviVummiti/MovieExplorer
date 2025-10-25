const API_KEY = "21128f9e"; // API Key

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieContainer = document.getElementById("movieContainer");

// Listen for button click or Enter key press
searchBtn.addEventListener("click", fetchMovies);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") fetchMovies();
});

async function fetchMovies() {
  const query = searchInput.value.trim();
  if (!query) {
    alert("Please enter a movie name");
    return;
  }

  movieContainer.innerHTML = "<p class='loading'>Loading...</p>";

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      movieContainer.innerHTML = `<p class='error'>${data.Error}</p>`;
    }
  } catch (error) {
    console.error(error);
    movieContainer.innerHTML = `<p class='error'>Failed to load data</p>`;
  }
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";
  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>
    `;
    movieContainer.appendChild(movieCard);
  });
}
