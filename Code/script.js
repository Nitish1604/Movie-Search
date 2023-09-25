//Most Popular Movies
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const searchAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const movieBox = document.querySelector("#movie-box");

const getMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  showMovies(data);
};

const showMovies = (data) => {
  movieBox.innerHTML = ""; //reset the movie box
  data.results.forEach((movie) => {
    // console.log(movie);
    const {poster_path, original_title, overview, vote_average} = movie;
    const imagePath =
      poster_path === null
        ? "image-missing.png"
        : IMGPATH + poster_path;
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
      <img src="${imagePath}" alt="" />
      <div class="overlay">
        <div class="title">
            <h2>${original_title}</h2>
            <span>${vote_average}</span>
        </div>
        <h3>Overview:</h3>
        <p> 
            ${overview}
        </p>
        </div>
      `;
    movieBox.appendChild(box);
  });
};

document.querySelector("#search").addEventListener("keyup", function (event) {
  if (event.target.value != "") {
    getMovies(searchAPI + event.target.value);
  } else {
    getMovies(APIURL);
  }
});

getMovies(APIURL);
