import {addLanguageChange} from './language.js'
import {emailChange as changeEmailButton} from './buttonsFunctions.js'

document.addEventListener('DOMContentLoaded', () => {
    // After the content is loaded get some content to be used
    const en = document.getElementById('EN');
    const pt = document.getElementById('PT');
    const bodyln = document.querySelector('body');
    

    // Add the changeLanguage function to each of them language buttons
    addLanguageChange(en, pt, bodyln);

    // Adding the copy function to the e-mail me button, to make easier to the user to copy the e-mail
    // also add the hover effect to show the e-mail and the tooltip
    changeEmailButton(bodyln)
})