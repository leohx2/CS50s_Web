import {homePage as homePageRender} from './../Pages/homePage.js'
import {renderContactPage} from './../Pages/contactPage.js'
import { transictionMaker } from '../Functionalities/transiction.js';
import { addLanguageChange } from '../Functionalities/language.js';
import { renderNewProject } from '../Pages/newProject.js';
import { renderProjectsPage } from '../Pages/projectsPage.js';

// This function will prevent the page to reload or change after the user click on the link on navBar.
// It will also change the active class to make sure the current page is the one with the "active" class.
export function setNavBarBehavior (main, container, buttons) {
    // Query all the items from navBar
    const navAncorEl = document.querySelectorAll(".navA");
    
    
    navAncorEl.forEach((navItem) => {
        // Add the changeLanguage to contact page
        addLanguageChange(buttons, main, container);

        navItem.addEventListener('click', (e) => {
            // Go for every navItem and prevent the default behavior
            e.preventDefault();

            // After that check if this item is the one with the active class, if yes does nothing, if its not
            // query for the one naviTem with the active class remove the active class and add it to the one the user is clicking on
            // and render the desired page.
            if( e.target.classList.contains("active") === true) return;

            // Select the active item
            const activeItem = document.querySelector(".navA.active");

            // Change the classes
            activeItem.classList.remove("active");
            e.target.classList.add("active");

            // Now render the clicked page
            switch (e.target.dataset.page) {
                case 'about':
                    //console.log('about');
                    break;
                case 'projects':
                    transictionMaker(()=>{
                        container.classList.remove(history.state.render)
                        container.classList.add('projects')
                        renderProjectsPage(main, container, buttons);
                    }, "opacity fast")
                    break;
                case 'awards':
                    //console.log('awards');
                    break;
                case 'newProject':
                    transictionMaker(()=>{
                        container.classList.remove(history.state.render)
                        container.classList.add('newProject')
                        renderNewProject(main, container, buttons);
                    }, "opacity fast")
                    break;
                case 'contact':
                    transictionMaker(()=>{
                        container.classList.remove(history.state.render)
                        container.classList.add('contact')
                        renderContactPage(main, container, buttons);
                    }, "opacity fast")
                    break;
                default:
                    transictionMaker(()=>{
                        container.classList.remove(history.state.render)
                        container.classList.add('home')
                        homePageRender(main, container, buttons);
                    }, "opacity fast")
                    break;
            }
        })
    })
}
