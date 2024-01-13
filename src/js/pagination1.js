import renderHome from "./renderHome";

//  1. attach event listener to pagination buttons

//capture current page
let currentPage = 1;


//  get all buttons with class pagination-button
let paginationButtons = document.getElementsByClassName('page-button');
    
for(let paginationButton of paginationButtons) {

    paginationButton.onclick = async function (e) {
        const dataIndex = e.currentTarget.getAttribute('data-index');
        currentPage = parseInt(dataIndex);
        
        await renderHome.render({page: currentPage});
        
    }

    // paginationButton.addEventListener('click', function (e) {
    //     alert('Page me');
    // });
}

//get all page arrow buttons
let pageArrowButtons = document.getElementsByClassName('page-arrow');
// async call for API
for (let pageArrowButton of pageArrowButtons) {
    pageArrowButton.onclick = async function (e) {
        const dataIndex = e.currentTarget.getAttribute('data-index');
        currentPage = currentPage + parseInt(dataIndex);
        if (currentPage <= 0 ) {
            currentPage = 1;
        }
        await renderHome.render({page: currentPage});
        
    }
}