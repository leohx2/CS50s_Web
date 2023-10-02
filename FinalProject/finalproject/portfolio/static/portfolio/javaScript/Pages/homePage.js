import {emailChange as copyEmail} from './../Functionalities/buttonsFunctions.js'
import { cleandAndUpdateState } from '../Functionalities/cleanAndUpdateState.js';
import { transictionMaker } from '../Functionalities/transiction.js';
import { renderProjectsPage } from './projectsPage.js';

// Function the render the home page
export function homePage (main, container, backButton=false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, "home", backButton)
    
    // Home page content.
    if (main.dataset.language === 'en') {
        container.insertAdjacentHTML('afterbegin', 
        `
        <div class="homePage-authorDescription">
             <div class="authorDescription-content">
                 <h3 class="authorDescription-welcome">Hello! I am</h3>
                 <h1 class="authorDescription-name">Jonarth</h1>
                 <span class="authorDescription-job">Fine artist</span>
                 <span class="authorDescription-briefing">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, est
                     vitae tempor mollis, mauris purus euismod nisl, et viverra justo ipsum vitae
                     ligula. Mauris quis auctor ligula
                 </span>
                 <div class="authorDescription-buttons">
                     <div class="tooltip">
                         <button class="authorDescription-buttons-email" >
                             <span class=buttons-email-span>info.jonarth@gmail.com</span>
                         </button>
                         <span class="tooltipText"></span>
                     </div>
                     <button class="authorDescription-buttons-projects" >Projects</button>
                 </div>
             </div>
         </div>
    
            <div class="homePage-authorPicture">
                <img class="authorImg" src="../../static/portfolio/images/john_image_1.jpeg" alt="Jonathan Rosildo Image">
            </div>
        `);
    } else {
        container.insertAdjacentHTML('afterbegin', 
        `
        <div class="homePage-authorDescription">
             <div class="authorDescription-content">
                 <h3 class="authorDescription-welcome">Olá! Eu sou o</h3>
                 <h1 class="authorDescription-name">Jonarth</h1>
                 <span class="authorDescription-job">Artista plástico</span>
                 <span class="authorDescription-briefing">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, est
                     vitae tempor mollis, mauris purus euismod nisl, et viverra justo ipsum vitae
                     ligula. Mauris quis auctor ligula
                 </span>
                 <div class="authorDescription-buttons">
                     <div class="tooltip">
                         <button class="authorDescription-buttons-email" >
                             <span class=buttons-email-span>info.jonarth@gmail.com</span>
                         </button>
                         <span class="tooltipText"></span>
                     </div>
                     <button class="authorDescription-buttons-projects" >Projectos</button>
                 </div>
             </div>
         </div>
    
            <div class="homePage-authorPicture">
                <img class="authorImg" src="../../static/portfolio/images/john_image_1.jpeg" alt="Jonathan Rosildo Image">
            </div>
        `);       
    }
    // Send the user to projects page when clicks on projects button
    document.querySelector(".authorDescription-buttons-projects").addEventListener('click', () => {
        transictionMaker(()=>{
            container.classList.remove(history.state.render)
            container.classList.add('projects')
            const activeItem = container.offsetWidth > 850 ? document.querySelector(".navA.active.navBar-bigScreen") : document.querySelector(".navA.active.navBar-smallScreen");
            activeItem.classList.remove("active")
            container.offsetWidth > 850 ? document.querySelector(".navBar-bigScreen[data-page='projects']").classList.add("active") : document.querySelector(".navBar-smallScreen[data-page='projects']").classList.add("active")
            renderProjectsPage(main, container);
        }, "opacity fast")
    })
    // Adding the copy function to the e-mail me button, to make easier to the user to copy the e-mail
    // also add the hover effect to show the e-mail and the tooltip
    copyEmail(main);

    // Safari is not the best browser ever, so to avoid an error on Home page we must set that:
    // Otherwise the .homePage-authorPicture would take way more space than necessary beacuse no width is set to it.
    const containerHeigt = container.offsetHeight
    const divRenderedSize = document.querySelector(".homePage-authorPicture")

    // We based our divRenderedSize on 66.6% of height of the container (same as the height of the image, prevent Safari of taking more space than the image width)
    divRenderedSize.style.width = `${(66.6 * containerHeigt) / 100}px`
}