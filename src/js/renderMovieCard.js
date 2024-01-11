import Handlebars from "handlebars";
import { GENRES } from "./config";

class RenderMovieCard {
  render(options) {
    console.log("start movie card rendering");
    let genres = options.genre_ids.map((g) => GENRES[g]);
    let genreNames = genres.join(", ");
    const templateHtml = `<div
  class="col-lg-4 col-md-6 col-sm-12 movie-card"
  data-movie-id="{{id}}"
  data-bs-toggle="modal"
  data-bs-target="#movie-details-modal"
>
  <img src="https://image.tmdb.org/t/p/w342{{poster_path}}" class="img-fluid poster-border" width="274px"/>
  <h3 class="movie-card-title">{{original_title}}</h3>
  <p><span class="movie-card-details">{{ genre_names }} | {{release_year}}</span> <span class="vote-average">{{vote_average}}</span></p>
</div>
`;
    const template = Handlebars.compile(templateHtml);

    options.genre_names = genreNames;

    const releaseDate = options.release_date;
    const releaseYear = releaseDate.split("-")[0];
    console.log(releaseYear);
    options.release_year = releaseYear;

    return template(options);
  }
}

export default new RenderMovieCard();
