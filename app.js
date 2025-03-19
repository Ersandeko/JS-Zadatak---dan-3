'use strict';
const jsonURL = 'https://jsonblob.com/api/jsonBlob/1351950892655632384/'; 

const movieContainer = document.getElementById('movies');
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const yearFilter = document.getElementById('yearFilter');

let allMovies = []; 


fetch(jsonURL)
  .then(response => response.json())
  .then(data => {
    allMovies = data.movies;
    populateFilters(allMovies);
    displayMovies(allMovies);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    movieContainer.innerHTML = `<p>Failed to load movies.</p>`;
  });


function populateFilters(movies) {
  const genres = new Set();
  const years = new Set();

  movies.forEach(movie => {
    movie.genre.forEach(g => genres.add(g));
    years.add(movie.year);
  });


  genres.forEach(genre => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });


  Array.from(years).sort((a, b) => b - a).forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
}


function fetchAndDisplayMovies() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedGenre = genreFilter.value;
  const selectedYear = yearFilter.value;

  const filteredMovies = allMovies.filter(movie => {
    const matchesTitle = movie.title.toLowerCase().includes(searchTerm);
    const matchesGenre = selectedGenre === '' || movie.genre.includes(selectedGenre);
    const matchesYear = selectedYear === '' || movie.year.toString() === selectedYear;

    return matchesTitle && matchesGenre && matchesYear;
  });

  displayMovies(filteredMovies);
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
        <h2 class="movie-title">${movie.title}</h2>
        <p class="movie-year">Year: ${movie.year}</p>
        <p class="movie-genre">Genre: ${movie.genre.join(', ')}</p>
      </div>
    `;

    movieContainer.appendChild(card);
  });
}


searchButton.addEventListener('click', fetchAndDisplayMovies);
