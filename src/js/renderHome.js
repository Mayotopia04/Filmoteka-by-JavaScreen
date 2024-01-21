import MovieDbApi from './api';
import renderMovieCard from './renderMovieCard';
import renderPagination from './renderPagination';
import renderMovieDetails from './renderMovieDetails';

class RenderHome {

  async render(options) {
    console.log('start home rendering');
    //  Call API to get trending movies
    const movies = await MovieDbApi.getTrendingMovies('day', options.page);
    let trendingMoviesHtml = '';
    //  movies.data.results
    //  Iterate through each movie results
    let count = 0;
    movies.data.results.forEach((movie) => {
      // const movieHtml=  RenderMovieCard.render(movie);

      trendingMoviesHtml = trendingMoviesHtml + renderMovieCard.render(movie);
      count++;
    });
    document.getElementById('content').innerHTML = trendingMoviesHtml;
    renderPagination.render(options.page);
    this.setupMovieCardOnClick();

  }

  setupMovieCardOnClick() {
    const movieCardLinks = document.getElementsByClassName('movie-card');
    for (const movieCardLink of movieCardLinks) {
      movieCardLink.onclick = async function(ev) {
        const movieId = ev.currentTarget.getAttribute('data-movie-id');
        //  call movie api to get details of movieId
        const response = await MovieDbApi.getMovieDetails(movieId);
        // console.log(response);
        //  pass the response of the movie details api to RenderMovieDetails
        renderMovieDetails.render(response.data);

        let addToWatchedBtn = document.getElementById('add-to-watched-btn');
        let addToQueueBtn = document.getElementById('add-to-q-btn');
        addToWatchedBtn.onclick = function(e) {

          // get item if it exists in localStorage
          let watchedMoviesText = localStorage.getItem('watchedMovies');
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
            release_date: response.data.release_date,

          };

          watchedMovies.push(movieInfo);

          localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
          console.log(watchedMovies);
        };

        addToQueueBtn.onclick = function(e) {

          let queuedMoviesText = localStorage.getItem('queuedMovies');
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
            release_date: response.data.release_date,

          };

          queuedMovies.push(movieInfo);

          localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
        };
      };
    }
  }
}

export default new RenderHome();