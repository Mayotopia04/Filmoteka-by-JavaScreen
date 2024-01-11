import Handlebars from 'handlebars';
import MovieDbApi from './api';
import RenderMovieCard from "./renderMovieCard";

class RenderHome {

    async render(options) {
        console.log('start home rendering');
        //  Call API to get trending movies
        const movies = await MovieDbApi.getTrendingMovies('day', 1);
        let trendingMoviesHtml = '';
        //  movies.data.results
        //  Iterate through each movie results
        movies.data.results.forEach((movie) => {
            const movieHtml=  RenderMovieCard.render(movie);
            trendingMoviesHtml = trendingMoviesHtml + movieHtml;
        });

        //  Add logic to render the home main tag
        const template = Handlebars.compile(trendingMoviesHtml);
        document.getElementById('content').innerHTML = template({});
    }
}

export default new RenderHome();