// import api from './api/api-service';
import { currentPage, defineResultsPerPage } from './pagination';

document.addEventListener('DOMContentLoaded', startPage);

async function startPage() {
  NProgress.start();

  try {
    const data = await api.getTrendData(currentPage);

    const movies = data.results;

    const allGenres = getGenres();
    const fullTrendData = dataCombine(movies, allGenres);
    const size = defineResultsPerPage();

    renderCollection(cutItems(fullTrendData, size));
  } catch (error) {
    errorModal();
    console.error('Smth wrong with start page fetch' + error);
  }

  NProgress.done();
}

function cutItems(array, number) {
  return array.slice(0, number);
}

export { startPage };
