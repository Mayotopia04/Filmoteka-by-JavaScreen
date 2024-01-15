
import MovieDbApi from './api';

import renderMovieCard from './renderMovieCard';

class RenderLibrary {

    async render(localStorageKey) {
        console.log(localStorageKey);
        //  Call API to get trending movies
        const moviesText = localStorage.getItem(localStorageKey);
        let movies = [];
        if (moviesText){
            movies = JSON.parse(moviesText);
        }
        
        let moviesHtml = '';
        
        //  movies.data.results
        //  Iterate through each movie results
        let count = 0;
        movies.forEach((movie) => {
            // const movieHtml=  RenderMovieCard.render(movie);
            
            moviesHtml = moviesHtml + renderMovieCard.render(movie);
            count++;
        });
        document.getElementById('content').innerHTML = moviesHtml;
    }
}

export default new RenderLibrary();