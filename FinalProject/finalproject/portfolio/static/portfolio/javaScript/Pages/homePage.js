import {addLanguageChange} from './../Functionalities/language.js'
import {emailChange as copyEmail} from './../Functionalities/buttonsFunctions.js'


// Function the render the home page
export function homePage (main, container, backButton=false) {
    // Clean any content before insert a new one
    container.innerHTML = ""

    // Set the url
    // The backbutton is a var to check if the user is on that page using the navBar or via the "back" or "foward" button from the browser.
    // If it is true use the replaceState that allow the user to use to foward button as well, otherwiser use the pushState.

    if (backButton === true) {
        history.replaceState({render: "home"}, "", "home")
    } else {
        history.pushState({render: "home"}, "", "home")
    }
    
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
                <img src="../../static/portfolio/images/john_image_1.jpeg" alt="Jonathan Rosildo Image">
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
                <img src="../../static/portfolio/images/john_image_1.jpeg" alt="Jonathan Rosildo Image">
            </div>
        `);       
    }

    // Adding the copy function to the e-mail me button, to make easier to the user to copy the e-mail
    // also add the hover effect to show the e-mail and the tooltip
    copyEmail(main);
}