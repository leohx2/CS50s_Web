import { cleandAndUpdateState } from "../Functionalities/cleanAndUpdateState.js"

// Creating the carousel structure 
function creatingCarousel () {
    // Setting the carousel items
    // Query the necessary items
    const carousel = document.querySelector(".carousel")
    const carouselItems = document.querySelectorAll(".carousel-item");
    const previousArrow = document.querySelector(".previousArrow")
    const nextArrow = document.querySelector(".nextArrow")

    // Add one buttom per carouselItem with the data-index equal to the carousel item 
    const htmlBtns = Array.from(carouselItems, (index) => {
        return `<span data-index="${index.dataset.index}" class="carousel-button"></span>`;
    });

    // Insert the html 
    carousel.insertAdjacentHTML("beforeend", `
        <div class="carousel-nav">
            ${ htmlBtns.join("") }
        </div>
    `);

    // Query the placed buttoms
    const buttons = carousel.querySelectorAll(".carousel-button")

    // Add the event listener to handle the click
    buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
            // Un-select all the items
            carousel.querySelector(".itemActive").classList.remove("itemActive")
            carousel.querySelector(".activeCarousel").classList.remove("activeCarousel")

            carouselItems[i].classList.add("itemActive");
            button.classList.add("activeCarousel");
        })
    });

    // Display the first item.
    carouselItems[0].classList.add("itemActive");
    buttons[0].classList.add("activeCarousel");

    // Insert the function to change the items with the arrows as well -> previous
    previousArrow.addEventListener("click", () => {
        // Query the active item and button
        const currentItem = carousel.querySelector(".itemActive");
        const currentButton = carousel.querySelector(".activeCarousel");
        
        // Remove the active class ftom button and item
        currentItem.classList.remove("itemActive");
        currentButton.classList.remove("activeCarousel");

        // if the carouselItem is the first, left arrow change to the last index item, otherwise display the previous
        if (currentItem.dataset.index === "1") {
            carouselItems[carouselItems.length - 1].classList.add("itemActive");
            buttons[buttons.length - 1].classList.add("activeCarousel");
        } else {
            carouselItems[currentItem.dataset.index - 2].classList.add("itemActive");
            buttons[currentItem.dataset.index - 2].classList.add("activeCarousel");
        }
    })

    // Insert the function to change the items with the arrows as well -> Next
    nextArrow.addEventListener("click", () => {
        // Query the active item and button
        const currentItem = carousel.querySelector(".itemActive");
        const currentButton = carousel.querySelector(".activeCarousel");
        
        // Remove the active class ftom button and item
        currentItem.classList.remove("itemActive");
        currentButton.classList.remove("activeCarousel");

        // if the carouselItem is the last, Next arrow change to the first index item, otherwise display the next
        if (currentItem.dataset.index == carouselItems.length) {
            carouselItems[0].classList.add("itemActive");
            buttons[0].classList.add("activeCarousel");
        } else {
            carouselItems[currentItem.dataset.index].classList.add("itemActive");
            buttons[currentItem.dataset.index].classList.add("activeCarousel");
        }
    })
}

// Data to create a new project
const inputTitle = `
        <div class="labelGroup">
            <label for="title">Título do projeto</label>
            <input type="text" name="title">
        </div>
    `;

const imageThumb = `
        <div class="labelGroup">
            <label for="title">URL da image</label>
            <input type="url" name="title">
        </div>
    `;

// Render the new project post page
export function renderNewProject(main, container, backButton=false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, "newProject", backButton);

    // New project page content, with a carousel to load the options to create a new post.
    container.insertAdjacentHTML('afterbegin', `
        <div class="newProject-container">
            <form class="carousel">
                <span class="previousArrow">&#9001;</span>
                <span class="nextArrow">&#9002;</span>
                <div class="carousel-item" data-index="1">${inputTitle} ${imageThumb}</div>
                <div class="carousel-item" data-index="2"> Css stuff, TODO...</div>
            </form>
            <div>
                <span> Thumbnail PREVIEW TODO...</span>
            </div>
        </div>
    `)
    // Create the carousel with the elements above
    creatingCarousel()

}