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


    
