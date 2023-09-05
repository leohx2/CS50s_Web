document.addEventListener('DOMContentLoaded', () => {
    // After the content is loaded get the button EN and PT
    const en = document.getElementById('EN');
    const pt = document.getElementById('PT');
    const bodyln = document.querySelector('body');
    const transition = document.querySelector('.transictionMaker')
    const mainInfo = document.querySelector('mainInfo')

    // Add the changeLangue function to each of them
    en.addEventListener('click', () => {
        // Check if it's necessary to run the function by checking the dataset language
        if (bodyln.dataset.language === 'en') return;
    
        // If it's the same language, change the button classes
        en.classList.add("active")
        pt.classList.remove("active")
        bodyln.dataset.language = 'en';
        transition.classList.add("transition")
        changeLanguage('en')

    });

    pt.addEventListener('click', () => {
        if (bodyln.dataset.language === 'pt') return;
    
        pt.classList.add("active")
        en.classList.remove("active")
        bodyln.dataset.language = 'pt';
        transition.classList.add("transition")
        changeLanguage('pt')
    });
})


// The ChangeLanguage function will check the body data attribute "language", if it's the same as the 
// parameter language, the function does nothig, otherwise catch the page content and change it to
// the language the user chose.
// By dafault the language is English.

function changeLanguage (language) {
    // Getting the elements to change
    const navAncorEl = document.querySelectorAll(".navA");
    const authorWelcome = document.querySelector(".authorDescription-welcome")
    const authorJob = document.querySelector(".authorDescription-job")
    // const authorBriefing = document.querySelector(".authorDescription-Briefing") comentend by now until there is acctualy a briefing
    
    if (language === "pt") {
        // Portuguese version
        navAncorEl[0].textContent = "Sobre mim";
        navAncorEl[1].textContent = "Projectos";
        navAncorEl[2].textContent = "Contactos";
        navAncorEl[3].textContent = "Prêmios";
        authorWelcome.textContent = "Ola! Eu sou o"
        authorJob.textContent = "Artista plástico"
    } else {
        // Portuguese version
        navAncorEl[0].textContent = "About me";
        navAncorEl[1].textContent = "Projects";
        navAncorEl[2].textContent = "Contact me";
        navAncorEl[3].textContent = "Awards";
        authorWelcome.textContent = "Hello! I am"
        authorJob.textContent = "Fine artist"
    }
}