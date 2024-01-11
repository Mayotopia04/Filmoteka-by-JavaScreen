//  Import all component renderers
import RenderHome from "./js/renderHome";
import RenderLibrary from "./js/renderLibrary";
import RenderHeader from "./js/renderHeader";
import RenderFooter from "./js/renderFooter";
import RenderSearch from "./js/renderSearch";
import RenderMovieDetails from "./js/renderMovieDetails";
import MovieDbApi from "./js/api";

//  Import config
import { CONTENT_KEYS } from "./js/config";

//  Instantiate global variables here
let currentContent = CONTENT_KEYS.home;

window.onload = async function () {
  await renderComponents();
  setupEventListeners();
};

//  Render all components
//  Header, Content, Footer
async function renderComponents() {
  //  Render Header
  RenderHeader.render({ active: currentContent });
  //  Render Content
  switch (currentContent) {
    case CONTENT_KEYS.home:
      await RenderHome.render({});
      break;
    case CONTENT_KEYS.library:
      await RenderLibrary.render({});
      break;
    case CONTENT_KEYS.search:
      await RenderSearch.render({});
      break;
  }
  //  Render Footer
  RenderFooter.render({});
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
      RenderMovieDetails.render(response.data);
    };
  }
}

function setupNavLinks() {
  const navLinks = document.getElementsByClassName("top-nav-link");
  for (const navLink of navLinks) {
    navLink.onclick = async function (ev) {
      const dataContent = ev.currentTarget.getAttribute("data-content");
      alert(dataContent);
    };
  }
}
