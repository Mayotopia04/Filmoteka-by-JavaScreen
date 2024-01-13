import MovieDbApi from './api';
import renderSearch from './renderSearch';

let searchButton = document.getElementById('search-button');
// async call for API


//  capture the search texts
//  call search API with search texts
//  render the  results in the page 
searchButton.onclick = async function (e) {
    const searchField = document.getElementById('search-input');
    await renderSearch.render({text: searchField.value});
    
}

    
