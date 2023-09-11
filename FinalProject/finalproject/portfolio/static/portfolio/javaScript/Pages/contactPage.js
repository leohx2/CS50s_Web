

// Function to render the contact page.
export function renderContactPage (main, container, buttons){
    console.log("Entrei aqui")
    // First of all, erase the content
    container.innerHTML = ""

    // Set the url
    history.pushState({}, "", "contact")

    // Contact me page content
    container.insertAdjacentHTML('afterbegin', `
        <div class="form-container">
            <form data-page = "contact" action="">
                <input id="message-name" type="text" placeholder="Your name">
                <input id="message-email" type="text" placeholder="Your Email">
                <textarea id="message-content" cols="30" rows="10" placeholder="Message"></textarea>
                <input type="submit" value="Send message.">
            </form>
        </div>
    `)
}
