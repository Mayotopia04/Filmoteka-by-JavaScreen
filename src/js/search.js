import MovieDbApi from './api';
import renderSearch from './renderSearch';
import renderMovieDetails from './renderMovieDetails';

let searchButton = document.getElementById('search-button');
// async call for API


//  capture the search texts
//  call search API with search texts
//  render the  results in the page 
searchButton.onclick = async function (e) {
    const searchField = document.getElementById('search-input');
    await renderSearch.render({text: searchField.value});
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
    
