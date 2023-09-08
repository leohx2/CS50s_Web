import {emailChange as changeEmailButton} from './Functionalities/buttonsFunctions.js'
import {homePage as homePageRender} from './Pages/homePage.js'

document.addEventListener('DOMContentLoaded', () => {
    // After the content is loaded get some content to be used
    const mainPage = document.querySelector('main');
    const sectionRender = document.querySelector('[data-render-section=true]');
    const buttons = {
        'en': document.getElementById('EN'),
        'pt': document.getElementById('PT')
    };
    // Render the first page based on the main data-page-render, info passed via Django based on the URL info
    choosePageToRender(mainPage, sectionRender, buttons)

    // Adding the copy function to the e-mail me button, to make easier to the user to copy the e-mail
    // also add the hover effect to show the e-mail and the tooltip
    changeEmailButton(mainPage);
});

function choosePageToRender(main, container, buttons){
    if (main.dataset.pageRender === "home") {
        homePageRender(main, container, buttons);
    };
}