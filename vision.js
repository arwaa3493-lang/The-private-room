// ====== VISION JS ======

// Select elements
const addCardBtn = document.getElementById("addCardBtn");
const visionBoard = document.querySelector(".vision-board");

// Function to handle image upload inside a card
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    // Check if an <img> already exists, if not create it
    let img = event.target.closest(".vision-card").querySelector("img");
    if (!img) {
      img = document.createElement("img");
      event.target.closest(".vision-card").appendChild(img);
    }
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Function to create a new vision card
function createVisionCard(title = "New Card") {
  const card = document.createElement("div");
  card.classList.add("vision-card");

  // Editable title
  const h3 = document.createElement("h3");
  h3.contentEditable = "true";
  h3.textContent = title;
  card.appendChild(h3);

  // Upload box (clickable label)
  const label = document.createElement("label");
  label.classList.add("upload-box");

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", handleImageUpload);

  const span = document.createElement("span");
  span.textContent = "Upload an image";

  label.appendChild(input);
  label.appendChild(span);
  card.appendChild(label);

  visionBoard.appendChild(card);
}

// Attach event listeners to existing cards
document.querySelectorAll(".vision-card input[type='file']").forEach(input => {
  input.addEventListener("change", handleImageUpload);
});

// Add new card on button click
addCardBtn.addEventListener("click", () => createVisionCard());