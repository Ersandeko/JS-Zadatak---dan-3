'use strict';
const jsonURL = 'https://jsonblob.com/api/jsonBlob/1351950892655632384/'; 

const movieContainer = document.getElementById('movies');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');


function fetchAndDisplayMovies(searchTerm = '') {
  fetch(jsonURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const movies = data.movies;

      
      const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      displayMovies(filteredMovies);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      movieContainer.innerHTML = `<p>Failed to load movies.</p>`;
    });
}


function displayMovies(movies) {
  movieContainer.innerHTML = ''; 

  if (movies.length === 0) {
    movieContainer.innerHTML = `<p>No movies found.</p>`;
    return;
  }

  movies.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'movie-card';

    card.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}">
      <div class="movie-details">
        <h2 class="movie-title">Title: ${movie.title}</h2>
        <p class="movie-year">Movie year: ${movie.year}</p>
        <p class="movie-genre">Genre: ${movie.genre.join(', ')}</p>
      </div>
    `;

    movieContainer.appendChild(card);
  });

  
}


searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  fetchAndDisplayMovies(searchTerm);
});


fetchAndDisplayMovies();
