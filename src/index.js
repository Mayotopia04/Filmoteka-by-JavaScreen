import renderHome from "./js/renderHome";
//  Import config
import {CONTENT_KEYS} from "./js/config";
import templateProcessor from "./js/templateProcessor";

//  Instantiate global variables here
let currentContent =  CONTENT_KEYS.home;

window.onload = async function () {
  await renderComponents();
  
  setupEventListeners();
  
}


//  Render all components
//  Header, Content, Footer
async function renderComponents() {

  await renderHome.render({page: 1});

}





//  Setup event listeners
//  Create a function for each type
function setupEventListeners() {
  setupNavLinks();
}

function setupNavLinks() {
  const navLinks = document.getElementsByClassName('top-nav-link');
  for(const navLink of navLinks) {
    navLink.onclick = async function (ev) {
      const dataContent = ev.currentTarget.getAttribute('data-content');
      alert(dataContent);
    }
  }
}
