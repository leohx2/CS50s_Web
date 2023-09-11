

// Function to render the contact page.
export function renderContactPage (main, container, buttons, backButton=false){
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
    container.insertAdjacentHTML('afterbegin', `
        <div class="form-container">
            <form data-page="contact" action="">
                <div class="input-container">
                    <input id="message-name" type="text" placeholder="Your name">
                    <input id="message-email" type="text" placeholder="Your Email">
                </div>
                <textarea id="message-content" cols="30" rows="10" placeholder="Message"></textarea>
                <input type="submit" value="Send message.">
            </form>
        </div>
    `)
}
