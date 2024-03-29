// Using that file will allow me to focus on the transictions of the web site
const transition = document.querySelector('body');
const transictionSection = document.querySelector('[data-render-section=true]');

export function transictionMaker (func, mode) {
    // Bellow the function step by step, it will work the same way for all the "modes"

    // 1- Add the transiction effect and wait 
    // 2 -Set timeOut to run the function only when the transition is on 50% of the duration.
    // 3 -Set timeOut to remove the transition class after the transition is over

    if (mode === "opacity slow") {
        transition.classList.add("transitionOpacity");
        setTimeout(() => func(), 500);
        setTimeout(() => transition.classList.remove("transitionOpacity"), 1000);
    }
    else if (mode === "opacity fast") {
        transition.classList.add("transitionOpacityFast");
        setTimeout(() => func(), 250);
        setTimeout(() => transition.classList.remove("transitionOpacityFast"), 500);
    }
}

export function transictionMakerSection (func, mode) {
    // Do the same as the above but instead do it in the whole page do it only in the section

    if (mode === "opacity slow") {
        transictionSection.classList.add("transitionOpacity");
        setTimeout(() => func(), 500);
        setTimeout(() => transictionSection.classList.remove("transitionOpacity"), 1000);
    }
    else if (mode === "opacity fast") {
        transictionSection.classList.add("transitionOpacityFast");
        setTimeout(() => func(), 250);
        setTimeout(() => transictionSection.classList.remove("transitionOpacityFast"), 500);
    }
}
