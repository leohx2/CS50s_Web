import {emailChange as copyEmail} from './../Functionalities/buttonsFunctions.js'
import { cleandAndUpdateState } from '../Functionalities/cleanAndUpdateState.js';
import { transictionMaker } from '../Functionalities/transiction.js';
import { renderProjectsPage } from './projectsPage.js';

// Thank you very much shapedivider.app
const waveShape = () => {
    return(`
        <div class="waveShapeHome">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
            </svg>
        </div>
        `)
}

// home page section 1 - author introduction
const authorIntroduction = (language) => {
    if (language === "en") {
        return(`
        <div class="authorIntroduction">
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
                ${waveShape()}
        </div>
        `)
    }
    else {
        return (`
        <div class="authorIntroduction">
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
                ${waveShape()}
        </div>
        `)
    }
}

// home page section 2 - about me
const aboutMe = (language) => {
    if (language === "en") {
        return(`
        <div class="aboutMe">
        </div>
        `)
    } else {
        return(`
        <div class="aboutMe">
        </div>
        `)
    }
}

// Function the render the home page and aboutme content 
export function homePage (main, container, backButton=false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, "home", backButton)
    
    // Home page content.
    if (main.dataset.language === 'en') {
        container.insertAdjacentHTML('afterbegin',`${authorIntroduction("en")} ${aboutMe("en")}`);
    } else {
        container.insertAdjacentHTML('afterbegin',`${authorIntroduction("pt")} ${aboutMe("pt")}`,);       
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