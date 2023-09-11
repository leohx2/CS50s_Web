import { addLanguageChange } from "../Functionalities/language.js";

// Function to render the contact page.
export function renderContactPage (main, container, backButton=false){
    // First of all, erase the content
    container.innerHTML = ""

    // Set the url
    // The backbutton is a var to check if the user is on that page using the navBar or via the "back" or "foward" button from the browser.
    // If it is true use the replaceState that allow the user to use to foward button as well, otherwiser use the pushState.
    if (backButton === true) {
        history.replaceState({render: "contact"}, "", "contact")
    } else {
        history.pushState({render: "contact"}, "", "contact")
    }

    // Contact me page content
    if (main.dataset.language === 'en') {
        container.insertAdjacentHTML('afterbegin', `
            <div class="contact-container">
                <div class="contact-image">
                    <img src="../../static/portfolio/images/john_image_3.jpeg" alt="Jonathan Rosildo Image">
                </div>
                <form data-page="contact" action="">
                    <div class="input-container">
                        <input class="form-fields" id="message-name" type="text" placeholder="Your name">
                        <input class="form-fields" id="message-email" type="text" placeholder="Your E-mail">
                    </div>
                    <textarea id="message-content" cols="30" rows="10" placeholder="Message"></textarea>
                    <input class="submitBtn" type="submit" value="Send message.">
                </form>
            </div>
        `)
    } else {
        container.insertAdjacentHTML('afterbegin', `
            <div class="contact-container">
                <div class="contact-image">
                    <img src="../../static/portfolio/images/john_image_3.jpeg" alt="Jonathan Rosildo Image">
                </div>
                <form data-page="contact" action="">
                    <div class="input-container">
                        <input class="form-fields" id="message-name" type="text" placeholder="Nome">
                        <input class="form-fields" id="message-email" type="text" placeholder="E-mail">
                    </div>
                    <textarea id="message-content" cols="30" rows="10" placeholder="Mensagem"></textarea>
                    <input class="submitBtn" type="submit" value="Send message.">
                </form>
            </div>
        `)
    }
}
