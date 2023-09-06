
// Using that file will allow me to focus on the transictions of the web site
const transition = document.querySelector('body');

export function transictionMaker (func) {
    // Add the transiction effect and wait 
    transition.classList.add("transitionOpacity");

    // Set timeOut to run the function only when the transition is on 50% of the duration.
    setTimeout(() => func(), 500);

    // Set timeOut to remove the transition class after the transition is over
    setTimeout(() => transition.classList.remove("transitionOpacity"), 1000);
}
