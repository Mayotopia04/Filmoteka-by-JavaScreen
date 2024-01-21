import MovieDbApi from './api';
import renderMovieCard from './renderMovieCard';
import renderPagination from './renderPagination';

class RenderSearch {

    async render(options) {
        console.log('start home rendering');
        //  Call API to get trending movies
        const movies = await MovieDbApi.searchMovies(options.text);
        let searchMatchHTML = '';
        //  movies.data.results
        //  Iterate through each movie results
        let count = 0;
        console.log(movies);
        movies.data.results.forEach((movie) => {
            // const movieHtml=  RenderMovieCard.render(movie);
            
            searchMatchHTML = searchMatchHTML + renderMovieCard.render(movie);
            count++;
        });
        document.getElementById('content').innerHTML = searchMatchHTML;
        renderPagination.render(options.page);
    }
}

export default new RenderSearch();