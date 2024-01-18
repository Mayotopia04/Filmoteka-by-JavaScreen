import templateProcessor from './templateProcessor';
import renderHome from './renderHome';
class RenderPagination {

  render(currentPage) {
    let leftArrow = '<button class="page-arrow pagination-button last-button me-2" data-index="-1">&lt;</button>';
    let dotsHtml = '<span class="dots px-3">...</span>';
    let pageButtonTemplate = '<button class="page-button pagination-button" data-index="{{pageNumber}}">{{pageNumber}}</button>';
    let rightArrow = '<button class="page-arrow pagination-button arrow-right ms-2" data-index="1">&gt;</button>';

    let pagesHtml = '';
    if (currentPage <= 3) {
      //  Render if current page 1 - 3
      //  << 1 2 3 4 5 ... 20 >>
      for(let p = 1; p <= 5; p++) {
        //  This loop creates buttons 1 - 5
        pagesHtml = pagesHtml + templateProcessor.replaceValues(pageButtonTemplate, {pageNumber: p})
      }
      //  This one adds the ...
      pagesHtml = pagesHtml + dotsHtml;
      //  This adds button 20 after the ...
      pagesHtml = pagesHtml + templateProcessor.replaceValues(pageButtonTemplate, {pageNumber: 20});
    } else if (currentPage >= 4 && currentPage <= 15) {
      //  << 1 ... 3 4 5 6 7 ... 20 >>
      pagesHtml = pagesHtml + templateProcessor.replaceValues(pageButtonTemplate, {pageNumber: 1});
      pagesHtml = pagesHtml + dotsHtml;
      for(let p = currentPage - 1; p <= currentPage + 3; p++) {
        //  This loop creates buttons 1 - 5
        pagesHtml = pagesHtml + templateProcessor.replaceValues(pageButtonTemplate, {pageNumber: p})
      }
      pagesHtml = pagesHtml + dotsHtml;
      pagesHtml = pagesHtml + templateProcessor.replaceValues(pageButtonTemplate, {pageNumber: 20});
    } else {
      //  Will capture from 16 - 20
      //  << 1 ... 16 17 18 19 20 >>
      pagesHtml = pagesHtml + templateProcessor.replaceValues(pageButtonTemplate, {pageNumber: 1});
      pagesHtml = pagesHtml + dotsHtml;
      for(let p = 16; p <= 20; p++) {
        //  This loop creates buttons 1 - 5
        pagesHtml = pagesHtml + templateProcessor.replaceValues(pageButtonTemplate, {pageNumber: p})
      }
    }

    document.getElementById('pagination').innerHTML = leftArrow + pagesHtml + rightArrow;

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


  }
}

export default new RenderPagination();