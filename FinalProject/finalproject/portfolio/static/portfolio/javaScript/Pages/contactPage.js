import { cleandAndUpdateState } from "../Functionalities/cleanAndUpdateState.js";

// check if the string is empty or filled with white spaces
function emptyString(str) {
    return (!str || /^\s*$/.test(str));
}

// Check if it's possible to send the e-mail, button disabled until all fields filled
function disabledButton(e, elements, button) {
    if (!emptyString(elements[0].value) && !emptyString(elements[1].value) && !emptyString(elements[2].value)) {
        button.classList.remove("disabled");
    } else {
        if (!button.classList.contains("disable")) {
            button.classList.add("disabled");
        }
    }
}

// Change the button while python sends the e-mail
function loading(btn) {
    btn.classList.add("submitLoading")
}

// Change the button back to normal after the loading ends
function endLoading(btn) {
    btn.classList.remove("submitLoading")
}

// Handle Submit and sending the e-mail info to django
async function handleSubmit(e) {
    e.preventDefault()
    const name = document.getElementById("message-name");
    const email = document.getElementById("message-email");
    const message = document.getElementById("message-content");

    if (emptyString(name.value) || emptyString(email.value) || emptyString(message.value)) {
        console.log("error, missing item");
        return
    } else {
        // Get the input to apply the loading function
        const btn = document.getElementById("submitEmail")

        // Send the e-mail info to django
        loading(btn)
        const res = await fetch(`/contact`, {
            method: 'POST',
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                message: message.value
            })
        })
        endLoading(btn)
        // Clean the input values after the send the e-mail
        name.value= "";
        email.value = "";
        message.value = "";
        document.getElementById("submitEmail").classList.add("disabled");
    }
}

// Function to render the contact page.
export function renderContactPage(main, container, backButton = false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, "contact", backButton)

  // Contact me page content
  if (main.dataset.language === "en") {
    container.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="contact-container">
            <div class="contact-image">
                <img src="../../static/portfolio/images/john_image_3.jpeg" alt="Jonathan Rosildo Image">
            </div>
            <div class="contact-fields">
            <div class="contact-fields-headline">
                <span>Get in touch!</span>
            </div>
            <form data-page="contact" id="emailForm">
                <div class="input-container">
                    <div class="inputTogether">
                        <label for="message-name" class="inputLabel">Name</label>
                        <input class="form-fields" data-event="onChange" id="message-name" type="text" placeholder="Name..." required>
                    </div>
                    <div class="inputTogether">
                        <label for="message-email" class="inputLabel">E-mail</label>
                        <input class="form-fields" data-event="onChange" id="message-email" type="text" placeholder="exemple@gmail.com" required>
                    </div>
                </div>
                <textarea data-event="onChange" id="message-content" cols="30" rows="10" placeholder="Message..." required></textarea>
                <button class="submitBtn disabled" id="submitEmail" type="submit">Send message</button>
            </form>
            <div class="contact-fields-socialMedia">
                <a class="socialMedia-link" href="https://www.instagram.com/jonarth.com_/" target="blank">
                    <div class="socialMedia-info">
                        <i class="fa-brands fa-instagram"></i>
                        <span>@jonarth.com_</span>
                    </div>
                </a>
                <div class="socialMedia-info">
                    <i class="fa-solid fa-envelope"></i>
                    <span>info.jonarth@gmail.com</span>
                </div>
            </div>
        </div>
        `
    );
  } else {
    container.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="contact-container">
            <div class="contact-image">
                <img src="../../static/portfolio/images/john_image_3.jpeg" alt="Jonathan Rosildo Image">
            </div>
            <div class="contact-fields">
            <div class="contact-fields-headline">
                <span>Entre em contacto!</span>
            </div>
            <form data-page="contact" id="emailForm">
                <div class="input-container">
                    <div class="inputTogether">
                        <label for="message-name" class="inputLabel">Nome</label>
                        <input class="form-fields" data-event="onChange" id="message-name" type="text" placeholder="Nome...">
                    </div>
                    <div class="inputTogether">
                        <label for="message-email" class="inputLabel">E-mail</label>
                        <input class="form-fields" data-event="onChange" id="message-email" type="text" placeholder="exemplo@gmail.com">
                    </div>
                </div>
                <textarea data-event="onChange" id="message-content" cols="30" rows="10" placeholder="Mensagem..."></textarea>
                <input class="submitBtn disabled" id="submitEmail" type="submit" value="Enviar mensagem.">
            </form>
            <div class="contact-fields-socialMedia">
                <a class="socialMedia-link" href="https://www.instagram.com/jonarth.com_/" target="blank">
                    <div class="socialMedia-info">
                        <i class="fa-brands fa-instagram"></i>
                        <span>@jonarth.com_</span>
                    </div>
                </a>
                <div class="socialMedia-info">
                    <i class="fa-solid fa-envelope"></i>
                    <span>info.jonarth@gmail.com</span>
                </div>
            </div>
        </div>
        `
    );
  }
  // Get the form in case it's submitted
  const formSubmit = document.getElementById("emailForm");
  formSubmit.addEventListener('submit', (e) => {handleSubmit(e)});

  // add an "on change" like event 
  const onchange = document.querySelectorAll('[data-event=onChange]');
  const buttonDisable = document.getElementById("submitEmail");
  // By adding the "input" event the code can track when the input has new change, if the user write or
  // erase any content the event will be triggered 
  onchange.forEach((item)=>{
    item.addEventListener('input', (e) => disabledButton(e, onchange, buttonDisable));
  })

}
