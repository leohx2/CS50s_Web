import {homePage as homePageRender} from './Pages/homePage.js'
import {setNavBarBehavior} from './NavBar/navBarRedirect.js'

document.addEventListener('DOMContentLoaded', () => {
    // After the content is loaded get some content to be used
    const mainPage = document.querySelector('main');
    const sectionRender = document.querySelector('[data-render-section=true]');
    const buttons = {
        'en': document.getElementById('EN'),
        'pt': document.getElementById('PT')
    };
    // Set the navBar behavior, to change the page content and the active item class.
    setNavBarBehavior()

    // Render the first page based on the main data-page-render, info passed via Django based on the URL info
    choosePageToRender(mainPage, sectionRender, buttons)
});

function choosePageToRender(main, container, buttons){
    if (main.dataset.pageRender === "home") {
        homePageRender(main, container, buttons);
    };
}