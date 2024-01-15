import templateProcessor from './templateProcessor';
class RenderMovieDetails {
  render(options) {
    console.log('start movie details rendering');
    const templateHtml = `<div class="modal-content modal-shape p-3">
    <div class="text-end"><button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button></div>

      <div class="row details-wrap">
      <div class="col-md-5">
            <img src="https://image.tmdb.org/t/p/w342{{poster_path}}" class="img-fluid poster-border poster-width"/>
      </div>
      <div class= "col">
       <h2 class="movie-details-title">{{original_title}}</h2>
       <div class="details-list-flex">
       <ul class="movie-details-list">
         <li class="movie-details-property">Vote / Votes</li>
         <li class="movie-details-property">Popularity</li>
         <li class="movie-details-property">Original Title</li>
         <li class="movie-details-property">Genre</li>
        </ul>
        <ul class="movie-details-list">
         <li class="movie-details-value"><span class="vote-average">{{vote_average}}</span> <span class="vote-slash">/</span> <span class="movie-details-value vote-count">{{vote_count}}</span></li>
         <li class="movie-details-value"><span class="movie-details-value">{{popularity}}</span></li>
         <li class="movie-details-value"><span class="movie-details-value">{{original_title}}</span></li>
         <li class="movie-details-value"><span class="movie-details-value">{{genre_names}}</span></li>
        </ul>
        </div>
        <div>
         <h3 class="movie-details-about">ABOUT</h3>
         <p class="movie-details-overview">{{overview}}</p>
        </div>
        <div class="movie-details-buttons">
         <button type="button" data-bs-dismiss="modal" id="add-to-watched-btn" class="add-watched-button">ADD TO WATCHED</button>
         <button type="button" data-bs-dismiss="modal" id="add-to-q-btn" class="add-queue-button">ADD TO QUEUE</button>
        </div>
      </div>
      </div>
    
</div>
`;

    document.getElementById('movie-details-content').innerHTML =
      templateProcessor.replaceValues(templateHtml, options);
  }
}
export default new RenderMovieDetails();
