import {homePage as homePageRender} from './Pages/homePage.js'
import {renderContactPage} from './Pages/contactPage.js'
import {setNavBarBehavior} from './NavBar/navBarRedirect.js'
import { transictionMaker } from './Functionalities/transiction.js';

document.addEventListener('DOMContentLoaded', () => {
    // After the content is loaded get some content to be used
    const main = document.querySelector('main');
    const container = document.querySelector('[data-render-section=true]');
    const buttons = {
        'en': document.getElementById('EN'),
        'pt': document.getElementById('PT')
    };

    // State will work as a page control, where we control when the user goes back or fowards using the browser buttons
    let state = {
        render: main.dataset.pageRender
    }

    // To make sure the user can use the "back button" from browser I'll set up the a state to render a function whenever it got changed
    // here we just send a custom state to our window.history
    window.history.replaceState(state, null, main.dataset.pageRender);

    // Now we add event on window popstate, whenver this function is called, render the event.state.render
    // by calling the event inside the onpopstate it has the older state (event.state), them we change the current one to it's older version
    window.onpopstate = function (event) {
        if (event.state) {
            // currentState = olderState
            state = event.state
            main.dataset.pageRender = state.render
            transictionMaker(() => {choosePageToRender(main, container, buttons, true)}, "opacity fast")
            document.querySelector(".active").classList.remove("active")
            document.querySelector(`[data-page=${state.render}]`).classList.add("active")
        }
    }

    // Set the navBar behavior, to change the page content and the active item class.
    setNavBarBehavior(main, container, buttons);

    // Render the first page based on the main data-page-render, info passed via Django based on the URL info
    choosePageToRender(main, container, buttons);
});

export function choosePageToRender(main, container, backButton=false){
    console.log("choosePageToRender " + main.dataset.pageRender)
    if (main.dataset.pageRender === "home") {
        homePageRender(main, container, backButton);
    } else if (main.dataset.pageRender === "contact") {
        renderContactPage(main, container, backButton);
    };
}
