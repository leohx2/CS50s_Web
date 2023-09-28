import { transictionMaker } from './transiction.js'
import { choosePageToRender } from '../main.js';


export function addLanguageChange (buttons, main, container, body) {
    // Add the changeLangue function to each of them
    buttons['en'].addEventListener('click', () => {
        // Check if it's necessary to run the function by checking the dataset language
        if (main.dataset.language === 'en') return;

        // If it's the same language, change the button classes
        buttons['en'].classList.add("active")
        buttons['pt'].classList.remove("active")

        // Change the dataset to the current language
        main.dataset.language = 'en';
        
        // Call the transition function that will aply the changes with a delay
        transictionMaker(()=> {
            // Call the function to change the navBar language, every page has the same navBar, but keep it if it's a mobile page
            if (container.offsetWidth > 400) 
            {
                changeNavBarLanguage(main.dataset.language)
            }

            // Re-render the page in the right language
            main.dataset.pageRender = history.state.render
            choosePageToRender(main, container, body)
        }, "opacity slow")

    });

    buttons['pt'].addEventListener('click', () => {
        // Check if it's necessary to run the function by checking the dataset language
        if (main.dataset.language === 'pt') return;

        // If it's the same language, change the button classes
        buttons['pt'].classList.add("active")
        buttons['en'].classList.remove("active")

        // Change the dataset to the current language
        main.dataset.language = 'pt';

        // Call the transition function that will aply the changes with a delay
        transictionMaker(()=> {
            // Call the function to change the navBar language, every page has the same navBar
            if (container.offsetWidth > 400) 
            {
                changeNavBarLanguage(main.dataset.language)
            }

            // Re-render the page in the right language
            main.dataset.pageRender = history.state.render
            choosePageToRender(main, container, body)
        }, "opacity slow")
    });
}

// Catch and change the navBar content language 
const changeNavBarLanguage = (language) => {
    const navAncorEl = document.querySelectorAll(".navA");
    if (language === "pt") {
        // Portuguese version
        navAncorEl[1].textContent = "Home";
        navAncorEl[3].textContent = "Sobre mim";
        navAncorEl[5].textContent = "Projectos";
        navAncorEl[7].textContent = "Prêmios";
        navAncorEl[9].textContent = "Contactos";
    } else {
        // English version
        navAncorEl[1].textContent = "Home";
        navAncorEl[3].textContent = "About me";
        navAncorEl[5].textContent = "Projects";
        navAncorEl[7].textContent = "Awards";
        navAncorEl[9].textContent = "Contact me";
    }
}
