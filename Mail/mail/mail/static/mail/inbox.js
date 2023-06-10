document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // Adding event listener to our form to prevent the deafult behavior and do not refreshing the page
  document.querySelector('#compose-form').addEventListener('submit', form_submited)

  // By default, load the inbox
  load_mailbox('inbox');
});

function clear_out() {
    // Clear out composition fields
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
}

function switch_view(view) {
    // select and hide the divs
    document.querySelector('#emails-view').style.display = (view === '#emails-view' ? 'block' : 'none');
    document.querySelector('#email-page-view').style.display = (view === '#email-page-view' ? 'block' : 'none');
    document.querySelector('#compose-view').style.display = (view === '#compose-view' ? 'block' : 'none');
}

function compose_email() {

  // Show compose view and hide other views
  switch_view('#compose-view')

  clear_out()
}

async function renderEmail(id) {
    // preparing the email page to render.
    switch_view('#email-page-view')

    // Selecting everything we need to fill the email page
    const emailDetails = document.querySelector('.emailPageDetails')
    const emailBody = document.querySelector('.emailPageBody')
    const res = await fetch(`/emails/${id}`)
    const json_res = await res.json()

    // Insert the page details
    emailDetails.innerHTML = `
        <p>
            <span>From: </span>${json_res.sender}
        </p>
        <p>
            <span>To: </span>${json_res.recipients[0]}
        </p>
        <p>
            <span>Subject: </span>${json_res.subject}
        </p>
        <p>
            <span>Timestamp: </span>${json_res.timestamp}
        </p>
    `
    emailBody.innerHTML = `
        <pre>${json_res.body}</pre>
    `

    // Setting email as read
    await fetch(`/emails/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            read: true
        })
    }) 
}
 
async function archiveEmail(Event, container, email, mode) {
    Event.stopImmediatePropagation()
    container.classList.add("archive_animation")
    container.addEventListener("animationend", async () => {
        await fetch(`/emails/${email.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                archived: !email.archived
            })
          })
        load_mailbox(mode)
    })
}

async function renderInboxOrSentPage(container, mode="inbox") {

    // Starting with a try catch to fetch the e-mails to render
    try {
        const response_get_email = await fetch(`/emails/${mode}`)
        const json_get_email = await response_get_email.json()
        let filtered
        if (mode === "archive") {
            filtered = json_get_email.filter((email => email.archived === true))
        }
        else {
            filtered = json_get_email.filter((email => email.archived === false))
        }
        filtered.reverse().map((email, index) => {
            container.insertAdjacentHTML(
                // The map will render all the e-mails one by one and it can be read already or not
                // the onClick will redirec us to the e-mail page with their specific content.
                "afterbegin",
                `<div ${email.read || mode==="sent" ? 'class="email read"': 'class="email"'}
                    id="emailInboxDiv${index}">
                    <div class="sender_subject">
                        <p>
                            <span>${email.sender}</span>
                            ${email.subject}
                        </p>
                    </div>
                    <div class="timestampAndArchive">
                        <div class="timestamp">
                            <span class=${mode === "sent" ? "noBorder": ""}>${email.timestamp}</span>
                        </div>
                        <button class=${mode === "sent" ? "displayNone" : "archivebtn"} id="archiveBtn${index}">
                            <img src=${mode === "inbox" ? "../static/mail/archive.png" :"../static/mail/unarchive.png"}/>
                        </button>
                    </div>
                </div>`
                )
                // Adding event Listeners
                document.querySelector(`#emailInboxDiv${index}`).addEventListener('click', () => renderEmail(email.id))
                document.querySelector(`#archiveBtn${index}`).addEventListener('click', (Event) => archiveEmail(Event, document.querySelector(`#emailInboxDiv${index}`), email, mode))
        })
    } catch (error) {
        console.log(error)
    }
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  switch_view('#emails-view')

  // Clean any potential error message
  document.querySelector('#error_message').innerHTML = ""

  // Show the mailbox name
  const emailsView = document.querySelector('#emails-view')
  emailsView.innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // creating a div right after the h3
  const element = document.createElement('div')
  element.classList.add('emails-container')
  element.setAttribute('id','content-container')
  emailsView.append(element)

  // Selecting the div created above
  const container = document.querySelector('#content-container')

  // by adding a switch case the web page will only render the selected type using function instead
  // writing their own in this funciton.
  switch (mailbox) {
    case "inbox":
        renderInboxOrSentPage(container)
        break;
    case "sent":
        renderInboxOrSentPage(container, mode="sent")
        break;
    case "archive":
        renderInboxOrSentPage(container, mode="archive")
        break;
    default:
        renderInboxOrSentPage(container)
        break;
    }
}

// Checking the fetch response
function checking_res(response) {
    // if the there is a error the webapp place a button with the error and the possibilty to close
    // button taken from bootstrap
    if (response.error) {
        document.querySelector('#error_message').innerHTML =`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${response.error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
    }
    else {
        // To get here everything should be fine, now we clear that out and redirect to inbox
        clear_out()
        load_mailbox('inbox')
    }
}

const form_submited = async (e) => {
    
    // Prevent the page from reload after form been submited 
    e.preventDefault()
    const recipients = e.target[1].value
    const subject = e.target[2].value
    const body = e.target[3].value

    // Use a trycatch to make sure there will be no error in the website only in the console log maybe
    try {
        const response = await fetch('/emails', {
            method: 'POST',
            body: JSON.stringify({
                recipients,
                subject,
                body
            })          
        })
        const json_res = await response.json()
        // This API send the error as a message, so we check it! 
        checking_res(json_res)
    } catch (error) {
        // Just in case we find a not expected error. 
        console.log(error)
    }
}
