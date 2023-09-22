import { cleandAndUpdateState } from "../Functionalities/cleanAndUpdateState.js";

// Exporting the projects render page.js
export async function renderProjectsPage (main, container, backbutton=false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, "projects", backbutton)

    // English content
    if (main.dataset.language === 'en'){
        container.insertAdjacentHTML('afterbegin',`
        <div class="category-design-container">
            <h2 class="category-title">Design</h2>
            <div class="category-thumbnails">
                ${await renderThumbnails("Design")}
            </div>
        </div>
        <div class="category-painting-container">
            ${await renderThumbnails("Pintura")}
        </div>
        <div class="category-sculpture-container">
            ${await renderThumbnails("Escultura")}
        </div>
        `);
    };
};

async function renderThumbnails(category) {
    // fetch the data from django
    const res = await fetch(`/thumb_details/${category}`);
    
    // jsonify the data
    // Data contains a list with dictionaries, the dictionary contains the thumbnail details, like:
    // category, post_id, image_url, title, title_size, title_weight
    const data = await res.json();
    console.log("----------"+category+"----------")
    data.forEach((element) => {
        console.log(element['title'])
    });
    console.log("--------------------")
    return `<h2>teste ${category}</h2>`
}
