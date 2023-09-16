import { cleandAndUpdateState } from "../Functionalities/cleanAndUpdateState.js"

// Creating the carousel structure 
function creatingCarousel () {
    // Setting the carousel items
    // Query the necessary items
    const carousel = document.querySelector(".carousel")
    const carouselItems = document.querySelectorAll(".carousel-item");
    const previousArrow = document.querySelector(".previousArrow");
    const nextArrow = document.querySelector(".nextArrow");

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
    const buttons = carousel.querySelectorAll(".carousel-button");

    // Add the event listener to handle the click
    buttons.forEach((button, i) => {
        button.addEventListener("click", () => {
            // Un-select all the items
            carousel.querySelector(".itemActive").classList.remove("itemActive");
            carousel.querySelector(".activeCarousel").classList.remove("activeCarousel");

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
        };
    });

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
        };
    })
}

// Function to render the thumb preview for the projects
function thumbNailPreview() {
    // Get the img, title and the category html to apply the changes
    const titlePreview = document.getElementById("titleThumbPreview");
    const imagePreview = document.getElementById("imageThumbPreview");
    const categoryPreview = document.getElementById("categoryThumbPreview");

    // Get the title and img inputs to apply the change the event listener
    // 1 - image and title
    const titleInput = document.getElementById("titleThumbInput");
    const imgInput = document.getElementById("imageThumbInput");

    // 2 - Css items Img
    const borderRadiusImg = document.getElementById("borderRadiusThumb");
    const borderOutput = document.getElementById("borderRadiusPx");

    // 3 - Css items title
    const titleFontSize = document.getElementById("titleSize");
    const titleFontOutputRm = document.getElementById("titleSizeRm");
    const titleFontWeight = document.getElementById("fontWeightInput");
    const titleFontWeightOutput = document.getElementById("fontWeightOutput");

    // 4 - Project category
    const categoryInput = document.getElementById("categoriesSelect");

    // Add the evenListener to apply to title and image preview
    titleInput.addEventListener('input', () => {
        titlePreview.textContent = titleInput.value;
    });
    imgInput.addEventListener('input', () => {
        imagePreview.src = imgInput.value;
    });

    // Add the borderRadius to image
    borderRadiusImg.addEventListener('input', () => {
        imagePreview.style.borderRadius = `${borderRadiusImg.value}px`;
        borderOutput.value = borderRadiusImg.value;
    });

    // Change the font size
    titleFontSize.addEventListener('input', () => {
        titlePreview.style.fontSize = `${titleFontSize.value}rem`;
        titleFontOutputRm.value = titleFontSize.value;
    });

    // Change the font weight
    titleFontWeight.addEventListener('input', () => {
        titlePreview.style.fontWeight = `${titleFontWeight.value}`;
        titleFontWeightOutput.value = `${titleFontWeight.value}`;
    });

    // Change the category
    categoryInput.addEventListener('change', () => {
        categoryPreview.textContent = categoryInput.value;
    });
}

// Data to create a new project
// Step 1 - choose image and title.
const imageThumb = `
        <div class="labelGroup">
            <label for="imageThumbInput">URL da image</label>
            <input id="imageThumbInput" type="url" name="image" placeholder="imagem url...">
        </div>
`;

const inputTitle = `
        <div class="labelGroup">
            <label for="titleThumbInput">Título do projeto</label>
            <input id="titleThumbInput" type="text" name="title" placeholder="título...">
        </div>
`;

// Step 2 - Css style
const imageBorderCss = `
        <div class="labelGroup">
            <label for="borderRadiusThumb">Borda</label>
            <input type="range" min="0" max="50" value="0" step="1" name="borderRadius" id="borderRadiusThumb">
            <output name="outputRange" id="borderRadiusPx" for="borderRadiusThumb">0</output>
            <span>px</span>
        </div>
`;
const titleCss = `
        <div class="labelGroup">
            <label for="titleSize">Tamanho da fonte</label>
            <input name="fontSize" id="titleSize" type="range" min="0.5" max="2" step="0.1" value="1">
            <output name="outputFont" id="titleSizeRm" for="titleSize">1</output>
            <span>rem</span>
        </div>
`;

const fontWeighHtmlContent= `
        <div class="labelGroup">
            <label for="fontWeightInput">Peso da fonte</label>
            <input name="fontWeight" id="fontWeightInput" type="range" min="200" max="900" step="100" value="200">
            <output name="outputFontWeight" id="fontWeightOutput" for="fontWeightInput">200</output>
        </div>
`;

// Choose the category, the author can choose hes project category, between Painting, Design and sculpture 
const categories = `
        <div class="labelGroupColumn">
            <label for="categoriesSelect">Escolha a área do projeto</label>
            <select name="categories" id="categoriesSelect">
                <option value=""></option>
                <option value="arte">Arte</option>
                <option value="design">Design</option>
                <option value="escultura">Escultura</option>
            </select>
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
                <div class="carousel-item" data-index="1">
                    <span class="carousel-item-steps">Passo 1 - imagem e título</span>
                    ${imageThumb} ${inputTitle} ${imageBorderCss} 
                </div>
                <div class="carousel-item" data-index="2">
                    <span class="carousel-item-steps">Passo 2 - Estilização do Título</span>
                    ${titleCss} ${fontWeighHtmlContent}
                </div>
                <div class="carousel-item" data-index="3">
                    <span class="carousel-item-steps">Passo 3 - Categoria</span>
                    ${categories}
                </div>
            </form>
            <div class="postPreview">
                <span id="categoryThumbPreview">Categoria</span>
                <div class="postPreview-img">
                    <img id="imageThumbPreview" src="../../static/portfolio/images/noImage.png" alt="thumbnail preview">
                </div>
                <span id="titleThumbPreview" class="postPreview-Title"> Título </span>
            </div>
        </div>
    `)
    // Create the carousel with the elements above
    creatingCarousel()
    thumbNailPreview()
}