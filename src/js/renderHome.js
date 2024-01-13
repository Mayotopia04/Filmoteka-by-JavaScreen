
import MovieDbApi from './api';

import renderMovieCard from './renderMovieCard';

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
    }
}

export default new RenderHome();