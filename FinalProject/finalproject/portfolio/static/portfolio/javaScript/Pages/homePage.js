import {addLanguageChange} from './../Functionalities/language.js'

// Function the render the home page
export function homePage (main, container, buttons) {
    // Add the changeLanguage to homePage
    addLanguageChange(buttons, main, "home");
    container.insertAdjacentHTML('afterbegin', 
    `
    <div class="homePage-authorDescription">
         <div class="authorDescription-content">
             <h3 class="authorDescription-welcome">Hello! I am</h3>
             <h1 class="authorDescription-name">Jonathan Rosildo</h1>
             <span class="authorDescription-job">Fine artist</span>
             <span class="authorDescription-briefing">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue, est
                 vitae tempor mollis, mauris purus euismod nisl, et viverra justo ipsum vitae
                 ligula. Mauris quis auctor ligula
             </span>
             <div class="authorDescription-buttons">
                 <div class="tooltip">
                     <button class="authorDescription-buttons-email" >
                         <span class=buttons-email-span>My e-mail</span>
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
}