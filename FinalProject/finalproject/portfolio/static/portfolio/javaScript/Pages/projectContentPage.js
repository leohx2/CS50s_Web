import { cleandAndUpdateState } from "../Functionalities/cleanAndUpdateState.js";

// Render the project page
export async function renderProject(main, container, post_id, backbutton=false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, `project/${post_id}`, backbutton, "project");
    
    // Get the post info
    const res = await fetch(`/project/${post_id}`, { method: 'POSTINFO' })
    // jsonify the res
    // data has the "title" and the "content", while "content" has a list of dictionaries with the text or image to render infos.
    const data = await res.json()
    // TODO... RENDER THE INFO FROM DATA
    container.insertAdjacentHTML('afterbegin', `
    <h2> HELLO, this is the post ${post_id}</h2>
    `)
    
}