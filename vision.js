// get main elements
const board = document.querySelector(".vision-board");
const addBtn = document.getElementById("addCardBtn");


// activate behaviour for each card
function activateCard(card) {

    const input = card.querySelector("input");
    const span = card.querySelector("span");
    const title = card.querySelector("h3");

    // make title editable
    title.setAttribute("contenteditable", "true");

    // hide default file input
    input.style.display = "none";

    // clicking upload text opens file picker
    span.addEventListener("click", () => {
        input.click();
    });

    // image upload
    input.addEventListener("change", function () {

        const file = this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            const oldImg = card.querySelector("img");
            if (oldImg) oldImg.remove();

            const img = document.createElement("img");
            img.src = e.target.result;

            img.style.width = "100%";
            img.style.marginTop = "10px";
            img.style.borderRadius = "10px";

            card.appendChild(img);
        };

        reader.readAsDataURL(file);
    });
}


// activate existing cards
document.querySelectorAll(".vision-card").forEach(card => {
    activateCard(card);
});


// create new card
addBtn.addEventListener("click", () => {

    const card = document.createElement("div");
    card.className = "vision-card";

    card.innerHTML = `
        <h3>New Vision</h3>
        <label class="upload-box">
            <input type="file" accept="image/*">
            <span>Upload an image</span>
        </label>
    `;

    board.appendChild(card);

    activateCard(card);
});