// Render a warning error message at the top of the screen

export function errorRender (container, message) {
    container.insertAdjacentHTML('afterbegin', `
    <div class="errorContainer">
        <span class="errorMessage">${message}</span>
        <button class="closeBtnWarning">&#x2715;</button>
    </div>
    `);

    const closeBtn = container.querySelector(".closeBtnWarning");
    const divAnimate = container.querySelector(".errorContainer");

    closeBtn.addEventListener("click", () => {
        console.log("teste")
        divAnimate.classList.add("resizeAnimation")
        divAnimate.onanimationend = () => {
            divAnimate.remove()
        }
    })
}