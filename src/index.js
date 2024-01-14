import renderHome from "./js/renderHome";
import MovieDbApi from './js/api';
//  Import config
import {CONTENT_KEYS} from "./js/config";
import templateProcessor from "./js/templateProcessor";
import renderMovieDetails from "./js/renderMovieDetails";

//  Instantiate global variables here
let currentContent =  CONTENT_KEYS.home;

window.onload = async function () {
  await renderComponents();
  
  setupEventListeners();
  
}


//  Render all components
//  Header, Content, Footer
async function renderComponents() {

  await renderHome.render({page: 1});

}





//  Setup event listeners
//  Create a function for each type
function setupEventListeners() {
  setupNavLinks();

  setupMovieCardOnClick();
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
