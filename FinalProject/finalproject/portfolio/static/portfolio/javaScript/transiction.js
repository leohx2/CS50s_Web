
// Using that file will allow me to focus on the transictions of the web site
const transition = document.querySelector('.transictionMaker');

export function transictionMaker (func) {
    // Add the transiction effect and wait 
    transition.classList.add("transition");

    // Set timeOut to run the function only when the transition is on 50% of the duration.
    setTimeout(() => func(), 1500);

    // Set timeOut to remove the transition class after the transition is over
    setTimeout(() => transition.classList.remove("transition"), 2500);
}
