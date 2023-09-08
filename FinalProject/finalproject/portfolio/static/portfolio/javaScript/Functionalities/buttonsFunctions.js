
const EMAIL = 'info.jonarth@gmail.com'

// Change the text when the mouse is over e-mail button and shows a tooltip text
export function emailChange (main) {
    // Query the necessary elements
    const emailBtn = document.querySelector('.authorDescription-buttons-email');
    const emailBtnSpan = document.querySelector('.buttons-email-span');
    const tooltipText = document.querySelector('.tooltipText')

    // Set the text according to the languge when the mouse is over and not over the button
    emailBtn.addEventListener("mouseover", () => {
        emailBtn.style.width = '200px';
        emailBtnSpan.style.opacity = 0;
        setTimeout ( () => {
            emailBtnSpan.style.opacity = 1;
            emailBtnSpan.textContent = 'info.jonarth@gmail.com'
        }, 300)
    })

    emailBtn.addEventListener("mouseout", () => {
        emailBtn.style.width = '100px';
        emailBtnSpan.style.opacity = 0;
        setTimeout ( () => {
            emailBtnSpan.style.opacity = 1;
            emailBtnSpan.textContent = main.dataset.language === "pt" ? "Meu e-mail" : "My e-mail"
        }, 300)
    }) 

    // Set the clipboard to the author e-mail
    emailBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(`${EMAIL}`)
        tooltipText.textContent = main.dataset.language === "pt" ? "Copiado" : "Copied"
        tooltipText.classList.add("fadeAnimation")
        setTimeout (() => {
            tooltipText.classList.remove("fadeAnimation")
        }, 1500)
    }) 
}