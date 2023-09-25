import { cleandAndUpdateState } from "../Functionalities/cleanAndUpdateState.js";

// Render the project page
export async function renderProject(main, container, post_id, backbutton=false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, `project/${post_id}`, backbutton, "project");

    container.insertAdjacentHTML('afterbegin', `
    <h2> HELLO, this is the post ${post_id}</h2>
    `)
    
}