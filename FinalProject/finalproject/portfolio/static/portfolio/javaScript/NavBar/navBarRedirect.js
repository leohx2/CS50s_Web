import {homePage as homePageRender} from './../Pages/homePage.js'
import {renderContactPage} from './../Pages/contactPage.js'
import { transictionMaker } from '../Functionalities/transiction.js';
import { addLanguageChange } from '../Functionalities/language.js';
import { renderNewProject } from '../Pages/newProject.js';
import { renderProjectsPage } from '../Pages/projectsPage.js';

// This function will prevent the page to reload or change after the user click on the link on navBar.
// It will also change the active class to make sure the current page is the one with the "active" class.
export function setNavBarBehavior (main, container, buttons, body) {
    // Query all the items from navBar
    const navAncorEl = document.querySelectorAll(".navA");
    
    
    navAncorEl.forEach((navItem) => {
        // Add the changeLanguage to contact page
        addLanguageChange(buttons, main, container, body);

        navItem.addEventListener('click', (e) => {
            // Go for every navItem and prevent the default behavior
            e.preventDefault();

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
                        if (body.classList.contains("blackBody")){
                            body.classList.remove("blackBody")
                            body.classList.add("whiteBody")
                        }
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
                        if (body.classList.contains("blackBody")){
                            body.classList.remove("blackBody")
                            body.classList.add("whiteBody")
                        }
                        renderNewProject(main, container, buttons);
                    }, "opacity fast")
                    break;
                case 'contact':
                    transictionMaker(()=>{
                        container.classList.remove(history.state.render)
                        container.classList.add('contact')
                        if (body.classList.contains("whiteBody")){
                            body.classList.remove("whiteBody")
                            body.classList.add("blackBody")
                        }
                        renderContactPage(main, container, buttons);
                    }, "opacity fast")
                    break;
                default:
                    transictionMaker(()=>{
                        container.classList.remove(history.state.render)
                        container.classList.add('home')
                        if (body.classList.contains("whiteBody")){
                            body.classList.remove("whiteBody")
                            body.classList.add("blackBody")
                        }
                        homePageRender(main, container, buttons);
                    }, "opacity fast")
                    break;
            }
        })
    })
}
