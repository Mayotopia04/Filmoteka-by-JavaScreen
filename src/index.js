import RenderHome from "./js/renderHome";
//  Import config
import {CONTENT_KEYS} from "./js/config";

//  Instantiate global variables here
let currentContent =  CONTENT_KEYS.home;

window.onload = async function () {
  await renderComponents();
  // renderComponents().then(() => {
  setupEventListeners();
  // });
}


//  Render all components
//  Header, Content, Footer
async function renderComponents() {

  await RenderHome.render({});

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
