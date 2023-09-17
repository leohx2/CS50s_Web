import { cleandAndUpdateState } from "../Functionalities/cleanAndUpdateState.js"
import { transictionMakerSection } from "../Functionalities/transiction.js";

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
    const allInputs = {
        // 1 - image and title
        titleInput: document.getElementById("titleThumbInput"),
        imgInput: document.getElementById("imageThumbInput"),

        // 2 - Css items Img
        borderRadiusImg: document.getElementById("borderRadiusThumb"),
        borderOutput: document.getElementById("borderRadiusPx"),

        // 3 - Css items title
        titleFontSize: document.getElementById("titleSize"),
        titleFontOutputRm: document.getElementById("titleSizeRm"),
        titleFontWeight: document.getElementById("fontWeightInput"),
        titleFontWeightOutput: document.getElementById("fontWeightOutput"),

        // 4 - Project category
        categoryInput: document.getElementById("categoriesSelect"),
    }
    // Add the evenListener to apply to title and image preview
    allInputs.titleInput.addEventListener('input', () => {
        titlePreview.textContent = allInputs.titleInput.value;
    });
    allInputs.imgInput.addEventListener('input', () => {
        imagePreview.src = allInputs.imgInput.value;
    });

    // Add the borderRadius to image
    allInputs.borderRadiusImg.addEventListener('input', () => {
        imagePreview.style.borderRadius = `${allInputs.borderRadiusImg.value}px`;
        allInputs.borderOutput.value = allInputs.borderRadiusImg.value;
    });

    // Change the font size
    allInputs.titleFontSize.addEventListener('input', () => {
        titlePreview.style.fontSize = `${allInputs.titleFontSize.value}rem`;
        allInputs.titleFontOutputRm.value = allInputs.titleFontSize.value;
    });

    // Change the font weight
    allInputs.titleFontWeight.addEventListener('input', () => {
        titlePreview.style.fontWeight = `${allInputs.titleFontWeight.value}`;
        allInputs.titleFontWeightOutput.value = `${allInputs.titleFontWeight.value}`;
    });

    // Change the category
    allInputs.categoryInput.addEventListener('change', () => {
        categoryPreview.textContent = allInputs.categoryInput.value;
    });

    // Return all the inputs to make it easier to save latter on and pass the data to the Database
    return (allInputs);
}

// Data to create a new project
// ___INFO ABOUT THUMBNAIL START___
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

// First part of the new project page, create the thumbnail view
const thumbnailView = `
        <div class="newProjectThumb-container">
            <div class="carousel">
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
            </div>
            <div class="postPreview">
                <span id="categoryThumbPreview">Categoria</span>
                <div class="postPreview-img">
                    <img id="imageThumbPreview" src="../../static/portfolio/images/noImage.png" alt="thumbnail preview">
                </div>
                <span id="titleThumbPreview" class="postPreview-Title"> Título </span>
            </div>
            <button class="newProject-preview-save">Salvar e continuar</button>
        </div>
`;
// ___INFO ABOUT THUMBNAIL END ___

// ___INFO ABOUT PROJECTMAKER START___

const projectTitle = `
    <label for="projectTitleInput"> Título </label>
    <input type="text" id="projectTitleInput">
`;

// Second part of the new project page, create the project maker page
const projectMakerView = `
    <div class="newProjectMaker-container">
        <div class="projectOptions">
            <ul>
                <li class="options-list title" >
                    ${projectTitle}
                </li>
                <li class="options-list">
                    <button class="projectOptions-choices" data-type="text" value="text">+ Texto</button>
                </li>
                <li class="options-list" >
                    <button class="projectOptions-choices" data-type="image" value="image">+ Imagem</button>
                </li>
            </ul>
        </div>
        <div class="projectContent">
            <h1 class="projectTitleFinal">Título aqui</h1>
        </div>
    </div>
`;


// Function to create a new text input and html elemnt to preview
function newTextContent(previewContainer, inputContainer, orderCounting) {
    // Create the elements
    inputContainer.insertAdjacentHTML('beforeend', `
        <div class="labelGroup">
            <label for="newTextArea${orderCounting}">Texto ${orderCounting}</label>
            <textarea id="newTextArea${orderCounting}" data-textarea-order="${orderCounting}">
            </textarea>
        </div>
    `);
    previewContainer.insertAdjacentHTML('beforeend', `
        <pre class="textContent" data-precontent-order="${orderCounting}">
        </pre>
    `);

    // add event listener to link the textarea content to the <pre> content
    const preContent = document.querySelector(`[data-precontent-order="${orderCounting}"]`)
    console.log(preContent)
    const textareaContent = document.querySelector(`[data-textarea-order="${orderCounting}"]`);
    textareaContent.addEventListener('input', () => {
        preContent.textContent = textareaContent.value;
    })
}

// Function to creat a new image input and the html elemnt preview
function newImageContent(reviewContainer, inputContainer, orderCounting) {
    // TODO...
}

// Set the second part of the new project page
function projectMakerPreview(container) {
    // The order counting will let me know the order to display the post element
    let orderCounting = 0;

    // The postContent will have following structure:
    // Text have an list of lists that will have "content" and "order", exemple: 
    // text:[["content 1", "1"], ["content 2", "3"]]
    // The image will receive a list of list will the content "url", "order", "borderRadius" amd "height", exemple:
    // image: [["image/image21", "2", "5px", "200px"], [["image/image32", "4", "5px", "200px"]]]
    const postContent = {text: [], image: []};

    // The div to insert new content, for preview and to edit
    const projectPreviewContainer = container.querySelector(".projectContent")
    const projectOptionsContainer = container.querySelector(".projectOptions")

    // Select the elements to aply the changes
    const finalTitle = container.querySelector(".projectTitleFinal");

    // Select the buttons to apply the eventListener
    const moreImageBtn = container.querySelector("[data-type=image]");
    const moreTextBtn = container.querySelector("[data-type=text]");
    
    // Select the Title input with the values
    const titleInput = container.querySelector("#projectTitleInput");

    // Add an event listener to the Title
    titleInput.addEventListener('input', () => {
        finalTitle.textContent = titleInput.value;
    });

    // Adding the functions to moreImg and moretext buttons
    moreImageBtn.addEventListener('click', () => {
        orderCounting += 1
        console.log(orderCounting)
    });

    moreTextBtn.addEventListener('click', () => {
        orderCounting += 1
        newTextContent(projectPreviewContainer , projectOptionsContainer, orderCounting)
        const addText = ["content" ,orderCounting]
    });
}
// ___INFO ABOUT PROJECTMAKER END___

// Render the new project post page
export function renderNewProject(main, container, backButton=false) {
    // Clean any content before insert a new one and upadte the state
    cleandAndUpdateState(container, "newProject", backButton);

    // New project page content, with a carousel to load the options to create a new post.
    // Part 1 -> Thumbnail
    container.insertAdjacentHTML('afterbegin', thumbnailView);
    // Create the carousel with the elements above
    creatingCarousel();
    // creating and saving the thumb settings
    const thumbNailInputs = thumbNailPreview();

    // Query the save button to receive the click 
    const saveBtn = document.querySelector(".newProject-preview-save");
    saveBtn.addEventListener("click", () => {
        // Save the thumb data to the DATABASE 
        // TODO...

        // When the user saves the thumb we render the post content maker
        // Transiction from the thumbMaker page to the this
        transictionMakerSection(() => {
            // Clean and render
            container.innerHTML = "";
            container.insertAdjacentHTML('afterbegin', projectMakerView);
            projectMakerPreview(container);
        }, "opacity fast");
    });

}