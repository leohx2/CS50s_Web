import {homePage as homePageRender} from './../Pages/homePage.js'
import {renderContactPage} from './../Pages/contactPage.js'

// This function will prevent the page to reload or change after the user click on the link on navBar.
// It will also change the active class to make sure the current page is the one with the "active" class.
export function setNavBarBehavior (main, container, buttons) {
    // Query all the items from navBar
    const navAncorEl = document.querySelectorAll(".navA");
    
    
    navAncorEl.forEach((navItem) => {
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
                    console.log('about');
                    break;
                case 'projects':
                    console.log('projects');
                    break;
                case 'awards':
                    console.log('awards');
                    break;
                case 'contact':
                    console.log('contact');
                    renderContactPage(main, container, buttons)
                    break;
                default:
                    console.log('home');
                    homePageRender(main, container, buttons)
                    break;
            }
        })
    })
}