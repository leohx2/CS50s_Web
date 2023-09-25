import { cleandAndUpdateState } from "../Functionalities/cleanAndUpdateState.js";
import { renderProject } from "./projectContentPage.js"
import { transictionMaker } from "../Functionalities/transiction.js"

// Exporting the projects render page.js
export async function renderProjectsPage (main, container, backbutton=false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, "projects", backbutton)

    // English content
    if (main.dataset.language === 'en'){
        container.insertAdjacentHTML('afterbegin',`
        <div class="category-container">
            <h2 class="category-title">Design</h2>
            <div class="category-thumbnails" id="Design">
            </div>
        </div>
        <div class="category-container">
            <h2 class="category-title">Painting</h2>
            <div class="category-thumbnails" id="Pintura">
            </div>
        </div>
        <div class="category-container">
            <h2 class="category-title">Sculpture</h2>
            <div class="category-thumbnails" id="Escultura">
            </div>
        </div>
        `);
        await renderThumbnails("Design")
        await renderThumbnails("Pintura")
        await renderThumbnails("Escultura")

        // Add a fuction to the user be able to click and go to the project page
        const divsThumb = container.querySelectorAll(".thumbnail-content");
        divsThumb.forEach((divThumb) => {
            divThumb.addEventListener('click', () => {
                transictionMaker(() => {
                    container.classList.remove(history.state.render)
                    container.classList.add('project')
                    renderProject(main, container, divThumb.dataset.postId ,backbutton)
                }, "opacity fast")
            })
        })

    } else {
        container.insertAdjacentHTML('afterbegin',`
        <div class="category-container">
            <h2 class="category-title">Escultura</h2>
            <div class="category-thumbnails" id="Escultura">
            </div>
        </div>
        <div class="category-container">
            <h2 class="category-title">Design</h2>
            <div class="category-thumbnails" id="Design">
            </div>
        </div>
        <div class="category-container">
            <h2 class="category-title">Pintura</h2>
            <div class="category-thumbnails" id="Pintura">
            </div>
        </div>
        `);
        await renderThumbnails("Design")
        await renderThumbnails("Pintura")
        await renderThumbnails("Escultura")

        // Add a fuction to the user be able to click and go to the project page
        const divsThumb = container.querySelectorAll(".thumbnail-content");
        divsThumb.forEach((divThumb) => {
            divThumb.addEventListener('click', () => {
                transictionMaker(() => {
                    container.classList.remove(history.state.render)
                    container.classList.add('project')
                    renderProject(main, container, divThumb.dataset.postId ,backbutton)
                }, "opacity fast")
            })
        })
    };
};

async function renderThumbnails(category) {
    // fetch the data from django
    const res = await fetch(`/thumb_details/${category}`);

    // jsonify the data
    // Data contains a list with dictionaries, the dictionary contains the thumbnail details, like:
    // borderRadius, category, post_id, image_url, title, title_size, title_weight
    const data = await res.json();

    // Query the div to render the thumbnails
    const container = document.getElementById(category);

    data.forEach((element) => {
        container.insertAdjacentHTML('afterbegin',`
            <div class="thumbnail-content" data-post-id="${element['post']}">
                <div class="thumbnail-content-image-container" data-post-image-container="${element['post']}">
                    <img src="${element['image_url']}" data-post-image="${element['post']}">
                </div>
                <span data-post-title="${element['post']}" >${element['title']}</span>
            </div>
        `);

        // Styling the elements, first we query and then apply the style
        const imageStyle = container.querySelector(`[data-post-image='${element["post"]}']`);
        const imageContainer = container.querySelector(`[data-post-image-container='${element["post"]}']`);
        const titleStyle =  container.querySelector(`[data-post-title='${element["post"]}']`);

        imageStyle.style.borderRadius = element['borderRadius'];
        imageContainer.style.borderRadius = element['borderRadius'];
        titleStyle.style.fontSize = element['title_size'];
        titleStyle.style.fontWeight = element['title_weight'];
    });
}
