import { cleandAndUpdateState } from "../Functionalities/cleanAndUpdateState.js";

// Image render
function imageHTMLRender(imageContent, projectContentDiv){
    // Insert the content inside the right div
    projectContentDiv.insertAdjacentHTML('beforeend',`
    <div class="projectContent-imageContainer" data-imageDiv-id="${imageContent.id}">  
        <img class="imagePost" src="${imageContent.url}" data-image-id="${imageContent.id}">
    </div>
    `)

    // Stylying the image
    const imageDivStylying = projectContentDiv.querySelector(`[data-imageDiv-id="${imageContent.id}"]`)
    const imageStylying = projectContentDiv.querySelector(`[data-image-id="${imageContent.id}"]`)

    imageDivStylying.style.borderRadius=imageContent.borderRadius
    imageStylying.classList.add(imageContent.size)
    imageStylying.style.borderRadius=imageContent.borderRadius
}

// Text render
function textHTMLRender(textContent, projectContentDiv){
    // Insert the content inside the right div
    projectContentDiv.insertAdjacentHTML('beforeend',`
    <pre class="projectContent-text">${textContent.content}</pre>
    `)
}

// Render the project page
export async function renderProject(main, container, post_id, backbutton=false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, `project/${post_id}`, backbutton, "project");
    
    // Get the post info
    const res = await fetch(`/project/${post_id}`, { method: 'POSTINFO' })
    
    // Jsonify the response
    // Data has the "title" and the "content", while "content" has a list of dictionaries with the text or image to render infos.
    const data = await res.json()
    
    // Render the title
    container.insertAdjacentHTML('afterbegin', `
    <h2 class="projectTitle">${data.title}</h2>
    <div class="projectContent"></div>
    `)

    // Render the content
    const projectContentDiv = container.querySelector('.projectContent')
    data.content.forEach((item) => {
        // For each element inside the data.content we check the item "type", if it's an image we call imageHTMLRender, if it's an text we call textHTMLRender
        item.type == "text" ? textHTMLRender(item, projectContentDiv) : imageHTMLRender(item, projectContentDiv)
    })
    
}