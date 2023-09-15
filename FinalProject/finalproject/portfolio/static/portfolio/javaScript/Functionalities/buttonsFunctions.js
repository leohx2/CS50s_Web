
const EMAIL = 'info.jonarth@gmail.com'

// Add the function to copy the e-mail
export function emailChange (main) {
    // Query the necessary elements
    const emailBtn = document.querySelector('.authorDescription-buttons-email');
    const tooltipText = document.querySelector('.tooltipText')

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
