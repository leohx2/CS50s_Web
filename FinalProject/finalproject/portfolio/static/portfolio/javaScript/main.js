import {homePage as homePageRender} from './Pages/homePage.js'
import {renderContactPage} from './Pages/contactPage.js'
import {setNavBarBehavior} from './NavBar/navBarRedirect.js'

document.addEventListener('DOMContentLoaded', () => {
    // After the content is loaded get some content to be used
    const main = document.querySelector('main');
    const container = document.querySelector('[data-render-section=true]');
    const buttons = {
        'en': document.getElementById('EN'),
        'pt': document.getElementById('PT')
    };
    // Set the navBar behavior, to change the page content and the active item class.
    setNavBarBehavior(main, container, buttons)

    // Render the first page based on the main data-page-render, info passed via Django based on the URL info
    choosePageToRender(main, container, buttons)
});

function choosePageToRender(main, container, buttons){
    if (main.dataset.pageRender === "home") {
        homePageRender(main, container, buttons);
    } else if (main.dataset.pageRender === "contact") {
        renderContactPage(main, container, buttons);
    };
}