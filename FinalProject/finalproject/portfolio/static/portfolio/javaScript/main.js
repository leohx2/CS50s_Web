import { homePage as homePageRender } from "./Pages/homePage.js";
import { renderContactPage } from "./Pages/contactPage.js";
import { setNavBarBehavior } from "./NavBar/navBarRedirect.js";
import { transictionMaker } from "./Functionalities/transiction.js";
import { renderNewProject } from "./Pages/newProject.js";
import { renderProjectsPage } from "./Pages/projectsPage.js";
import { renderProject } from "./Pages/projectContentPage.js";
import aboutMe from "./components/aboutMe.js";

document.addEventListener("DOMContentLoaded", () => {
    // After the content is loaded get some content to be used
    const main = document.querySelector("main");
    const container = document.querySelector("[data-render-section=true]");
    const body = document.querySelector("body");
    const buttons = {
        en: document.getElementById("EN"),
        pt: document.getElementById("PT"),
    };

    // State will work as a page control, where we control when the user goes back or fowards using the browser buttons
    let state = {
        render: main.dataset.pageRender,
    };

    // To make sure the user can use the "back button" from browser I'll set up the a state to render a function whenever it got changed
    // here we just send a custom state to our window.history
    // if we are rendering a project page content we need to replace with a different url, the "project" + "/" + "id"
    if (main.dataset.pageRender === "project") {
        const id = window.location.href.split("/").pop();
        window.history.replaceState(
            state,
            null,
            `/${main.dataset.pageRender}/${id}`
        );
    } else {
        window.history.replaceState(state, null, main.dataset.pageRender);
    }

    // Now we add event on window popstate, whenver this function is called, render the event.state.render
    // by calling the event inside the onpopstate we can access the older state (event.state), them we change the current one to it's older version
    window.onpopstate = function (event) {
        if (event.state) {
            // currentState = olderState
            state = event.state;
            // Update the page to render
            main.dataset.pageRender = state.render;
            // Call the transition maker and set the right active class.
            transictionMaker(() => {
                // Remove the current page class
                container.classList.remove(...container.classList);
                container.classList.add("mainSectionContainer");
                choosePageToRender(main, container, body, true);
            }, "opacity fast");
            document.querySelector(".active").classList.remove("active");

            // If the state.render == "project" we add the active class on the projects navItem
            if (state.render == "project") {
                state.render = "projects";
            }
            document
                .querySelector(`[data-page=${state.render}]`)
                .classList.add("active");
        }
    };
    // Set the navBar behavior, to change the page content and the active item class.
    setNavBarBehavior(main, container, buttons, body);

    // Render the first page based on the main data-page-render, info passed via Django based on the URL info
    choosePageToRender(main, container, body);
});

// Choose the page to render base on the ""
export function choosePageToRender(main, container, body, backButton = false) {
    switch (main.dataset.pageRender) {
        case "contact":
            container.classList.add("contact");
            body.classList.add("blackBody");
            renderContactPage(main, container, backButton);
            break;
        case "newProject":
            container.classList.add("newProject");
            body.classList.add("whiteBody");
            renderNewProject(main, container, backButton);
            break;
        case "project":
            container.classList.add("project");
            body.classList.add("whiteBody");
            const idRender = window.location.href.split("/").pop();
            renderProject(main, container, `${idRender}`, backButton);
            break;
        case "about":
            container.classList.add("about_me");
            body.classList.add("blackBody");
            homePageRender(main, container, backButton, true);
            break;
        default:
            container.classList.add("home");
            body.classList.add("blackBody");
            homePageRender(main, container, backButton);
            break;
    }
}
