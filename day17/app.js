const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=07c0295b89855000d0e19123fce52af1&page=";
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=07c0295b89855000d0e19123fce52af1&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEL = document.createElement("div");
    movieEL.classList.add("movie");
    movieEL.innerHTML = `
    <img
          src="${IMG_URL + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3 class="movie-title">${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          <p>
            ${overview}
          </p>
        </div>
    `;
    main.appendChild(movieEL);
  });
}
function getClassByRate(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  console.log(searchTerm);
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm + '"');
    search.value = "";
  } else {
    window.location.reload();
  }
});

const pages = document.querySelectorAll(".page");
pages.forEach((page) => {
  var currentPage = 1;
  page.addEventListener("click", () => {
    pages.forEach((page) => {
      page.classList.remove("active");
    });
    page.classList.add("active");
    currentPage = parseInt(page.innerText);
    getMovies(API_URL + currentPage);
  });
});
