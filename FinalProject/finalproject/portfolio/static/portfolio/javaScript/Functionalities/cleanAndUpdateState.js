
export function cleandAndUpdateState(container, renderState, backButton) {
    // Clean any content before insert a new one
    container.innerHTML = ""

    // Set the url
    // The backbutton is a var to check if the user is on that page using the navBar or via the "back" or "foward" button from the browser.
    // If it is true use the replaceState that allow the user to use to foward button as well, otherwiser use the pushState.

    if (backButton === true) {
        history.replaceState({render: renderState}, "", renderState)
    } else {
        history.pushState({render: renderState}, "", renderState)
    }
}