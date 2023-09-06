import { transictionMaker } from './transiction.js'

export function addLanguageChange (en, pt, bodyln) {
    // Add the changeLangue function to each of them
    en.addEventListener('click', () => {
        // Check if it's necessary to run the function by checking the dataset language
        if (bodyln.dataset.language === 'en') return;

        // If it's the same language, change the button classes
        en.classList.add("active")
        pt.classList.remove("active")

        // Change the dataset to the current language
        bodyln.dataset.language = 'en';
        
        // Call the transition function
        transictionMaker(()=>changeLanguage('en'))

    });

    pt.addEventListener('click', () => {
        // Check if it's necessary to run the function by checking the dataset language
        if (bodyln.dataset.language === 'pt') return;

        // If it's the same language, change the button classes
        pt.classList.add("active")
        en.classList.remove("active")

        // Change the dataset to the current language
        bodyln.dataset.language = 'pt';

        // Call the transition function
        transictionMaker(()=>changeLanguage('pt'))
    });
}

// The ChangeLanguage function will check the body data attribute "language", if it's the same as the 
// parameter language, the function does nothig, otherwise catch the page content and change it to
// the language the user chose.
// By dafault the language is English.

const changeLanguage = (language) => {
    // Getting the elements to change
    const navAncorEl = document.querySelectorAll(".navA");
    const authorWelcome = document.querySelector(".authorDescription-welcome");
    const authorJob = document.querySelector(".authorDescription-job");
    const emailBtn = document.querySelector('.authorDescription-buttons-email')
    const projectsBtn = document.querySelector('.authorDescription-buttons-projects')
    // const authorBriefing = document.querySelector(".authorDescription-Briefing") comentend by now until there is acctualy a briefing
    
    if (language === "pt") {
        // Portuguese version
        navAncorEl[0].textContent = "Sobre mim";
        navAncorEl[1].textContent = "Projectos";
        navAncorEl[2].textContent = "Contactos";
        navAncorEl[3].textContent = "Prêmios";
        authorWelcome.textContent = "Ola! Eu sou o";
        authorJob.textContent = "Artista plástico";
        emailBtn.textContent = "Meu e-mail"
        projectsBtn.textContent = "Projectos"
    } else {
        // English version
        navAncorEl[0].textContent = "About me";
        navAncorEl[1].textContent = "Projects";
        navAncorEl[2].textContent = "Contact me";
        navAncorEl[3].textContent = "Awards";
        authorWelcome.textContent = "Hello! I am";
        authorJob.textContent = "Fine artist";
        emailBtn.textContent = "My e-mail"
        projectsBtn.textContent = "Projects"
    }
}
