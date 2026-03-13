const addCardBtn = document.getElementById("addCardBtn");
const visionBoard = document.querySelector(".vision-board");

/* =========================
   IMAGE PREVIEW FUNCTION
========================= */

function handleImageUpload(card) {

  const input = card.querySelector("input[type='file']");
  const preview = card.querySelector(".preview");
  const uploadText = card.querySelector(".upload-text");

  if (!input || !preview) return;

  input.addEventListener("change", function () {

    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
      if (uploadText) uploadText.style.display = "none";
    };

    reader.readAsDataURL(file);
  });
}

/* =========================
   MAKE TITLES EDITABLE
========================= */

function makeTitleEditable(card) {

  const title = card.querySelector("h3");

  if (!title) return;

  title.contentEditable = true;

}

/* =========================
   INITIALIZE EXISTING CARDS
========================= */

document.querySelectorAll(".vision-card").forEach(card => {
  handleImageUpload(card);
  makeTitleEditable(card);
});

/* =========================
   ADD NEW CARD
========================= */

addCardBtn.addEventListener("click", () => {

  const newCard = document.createElement("div");
  newCard.className = "vision-card";

  newCard.innerHTML = `
    <h3 contenteditable="true">New Vision</h3>

    <label class="upload-box">
      <input type="file" accept="image/*">
      <span class="upload-text">Upload an image</span>
    </label>

    <img class="preview" />
  `;

  visionBoard.appendChild(newCard);

  handleImageUpload(newCard);
  makeTitleEditable(newCard);

});