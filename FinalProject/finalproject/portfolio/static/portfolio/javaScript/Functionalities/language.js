import { transictionMaker } from './transiction.js'

export function addLanguageChange (buttons, main, page) {
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
            // Call the function to change the page language
            chosePageToChange(main.dataset.language, page)
            // Call the function to change the navBar language, every page has the same navBar
            changeNavBarLanguage(main.dataset.language)
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
            // Call the function to change the page language
            chosePageToChange(main.dataset.language, page)
            // Call the function to change the navBar language, every page has the same navBar
            changeNavBarLanguage(main.dataset.language)
        }, "opacity slow")
    });
}

// Based on the page choose the right function changeLanguageX, where X is the page that we want to
// change de language
const chosePageToChange = (language, page) => {
    if (page === 'home') {
        changeLanguageHomePage(language)
    }
}

// Catch and change the navBar content language 
const changeNavBarLanguage = (language) => {
    const navAncorEl = document.querySelectorAll(".navA");
    if (language === "pt") {
        // Portuguese version
        navAncorEl[0].textContent = "Home";
        navAncorEl[1].textContent = "Sobre mim";
        navAncorEl[2].textContent = "Projectos";
        navAncorEl[3].textContent = "Prêmios";
        navAncorEl[4].textContent = "Contactos";
    } else {
        // English version
        navAncorEl[0].textContent = "Home";
        navAncorEl[1].textContent = "About me";
        navAncorEl[2].textContent = "Projects";
        navAncorEl[3].textContent = "Awards";
        navAncorEl[4].textContent = "Contact me";
    }
}

// Catch the home page content and change it to the language the user chose.
// By dafault the language is English.
const changeLanguageHomePage = (language) => {
    // Getting the elements to change
    const authorWelcome = document.querySelector(".authorDescription-welcome");
    const authorJob = document.querySelector(".authorDescription-job");
    const emailBtnSpan = document.querySelector('.buttons-email-span')
    const projectsBtn = document.querySelector('.authorDescription-buttons-projects')
    // const authorBriefing = document.querySelector(".authorDescription-Briefing") comentend by now until there is acctualy a briefing
    
    if (language === "pt") {
        // Portuguese version
        authorWelcome.textContent = "Ola! Eu sou o";
        authorJob.textContent = "Artista plástico";
        emailBtnSpan.textContent = "Meu e-mail"
        projectsBtn.textContent = "Projectos"
    } else {
        // English version
        authorWelcome.textContent = "Hello! I am";
        authorJob.textContent = "Fine artist";
        emailBtnSpan.textContent = "My e-mail"
        projectsBtn.textContent = "Projects"
    }
}
