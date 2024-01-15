import renderHome from "./js/renderHome";
import MovieDbApi from './js/api';
//  Import config
import {CONTENT_KEYS} from "./js/config";
import templateProcessor from "./js/templateProcessor";
import renderMovieDetails from "./js/renderMovieDetails";
import renderLibrary from "./js/renderLibrary";

//  Instantiate global variables here
let currentContent =  CONTENT_KEYS.home;

window.onload = async function () {
  await renderComponents();
  
  setupEventListeners();
  
}


//  Render all components
//  Header, Content, Footer
async function renderComponents() {

  const path = window.location.pathname;
  const page = path.split("/").pop();
  console.log( page );

  if (page === 'index.html') {
    // displays trending movies
    await renderHome.render({page: 1});
  } else {
    await renderLibrary.render('watchedMovies');

  }

  

}





//  Setup event listeners
//  Create a function for each type
function setupEventListeners() {
  setupNavLinks();

  setupMovieCardOnClick();

  setUpLibraryButtons();
}

function setupMovieCardOnClick() {
  const movieCardLinks = document.getElementsByClassName("movie-card");
  for (const movieCardLink of movieCardLinks) {
    movieCardLink.onclick = async function (ev) {
      const movieId = ev.currentTarget.getAttribute("data-movie-id");
      //  call movie api to get details of movieId
      const response = await MovieDbApi.getMovieDetails(movieId);
      // console.log(response);
      //  pass the response of the movie details api to RenderMovieDetails
      renderMovieDetails.render(response.data);

      let addToWatchedBtn = document.getElementById('add-to-watched-btn');
      let addToQueueBtn = document.getElementById('add-to-q-btn');
      addToWatchedBtn.onclick = function (e) {
        
        // get item if it exists in localStorage 
        let watchedMoviesText = localStorage.getItem("watchedMovies");
        let watchedMovies = [];
        if (watchedMoviesText) {
          watchedMovies = JSON.parse(watchedMoviesText);
        }

        let movieInfo = {
          id: response.data.id,
          poster_path: response.data.poster_path,
          original_title: response.data.original_title,
          vote_average: response.data.vote_average,
          genre_ids: response.data.genres.map(g => g.id),
          release_date: response.data.release_date

        }

        watchedMovies.push(movieInfo);

        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        console.log(watchedMovies);
      }


      
      addToQueueBtn.onclick = function (e) {
        
        let queuedMoviesText = localStorage.getItem("queuedMovies");
        let queuedMovies = [];
        if (queuedMoviesText) {
          queuedMovies = JSON.parse(queuedMoviesText);
        }
        let movieInfo = {
          id: response.data.id,
          poster_path: response.data.poster_path,
          original_title: response.data.original_title,
          vote_average: response.data.vote_average,
          genre_ids: response.data.genres.map(g => g.id),
          release_date: response.data.release_date

        }

        queuedMovies.push(movieInfo);

        localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
      }
    };
  }
}

function setupNavLinks() {
  const navLinks = document.getElementsByClassName('top-nav-link');
  for(const navLink of navLinks) {
    navLink.onclick = async function (ev) {
      const dataContent = ev.currentTarget.getAttribute('data-content');
      alert(dataContent);
    }
  }
}

function setUpLibraryButtons() {
  let watchedLibraryButton = document.getElementById('watched-library-btn');
  let qdLibraryButton = document.getElementById('qd-library-btn');
  watchedLibraryButton.onclick = async function (ev) {
    await renderLibrary.render('watchedMovies');
    watchedLibraryButton.classList.add('selected-button');
    qdLibraryButton.classList.remove('selected-button');
  }

  
  qdLibraryButton.onclick = async function (ev) {
    await renderLibrary.render('queuedMovies');
    qdLibraryButton.classList.add('selected-button');
    watchedLibraryButton.classList.remove('selected-button');
  }
}