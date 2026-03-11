// vision.js

document.addEventListener("DOMContentLoaded", () => {
  const visionBoard = document.querySelector(".vision-board");
  const addCardBtn = document.getElementById("addCardbtn");

  // Function to create a new vision card
  function createVisionCard(title = "New Card") {
    const card = document.createElement("div");
    card.classList.add("vision-card");

    // Editable title
    const cardTitle = document.createElement("h3");
    cardTitle.contentEditable = true;
    cardTitle.innerText = title;
    cardTitle.classList.add("vision-card-title");
    card.appendChild(cardTitle);

    // Image placeholder
    const img = document.createElement("img");
    img.src = ""; // empty initially
    img.alt = "Click to upload image";
    card.appendChild(img);

    // Hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none"; // hide it
    card.appendChild(input);

    // Placeholder text overlay
    const placeholder = document.createElement("p");
    placeholder.innerText = "Upload Image";
    placeholder.classList.add("placeholder-text");
    placeholder.style.position = "absolute";
    placeholder.style.top = "50%";
    placeholder.style.left = "50%";
    placeholder.style.transform = "translate(-50%, -50%)";
    placeholder.style.color = "#4b3828";
    placeholder.style.pointerEvents = "none";
    placeholder.style.fontStyle = "italic";
    placeholder.style.fontSize = "14px";
    card.style.position = "relative";
    card.appendChild(placeholder);

    // Click card to trigger file input
    card.addEventListener("click", () => {
      input.click();
    });

    // When image selected
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target.result;
        placeholder.style.display = "none"; // hide placeholder
      };
      reader.readAsDataURL(file);
    });

    visionBoard.appendChild(card);
  }

  // Add initial cards if they exist in HTML
  document.querySelectorAll(".vision-card").forEach((card) => {
    const img = card.querySelector("img");
    const input = card.querySelector("input[type=file]");
    const placeholder = card.querySelector(".placeholder-text");

    card.style.position = "relative";

    card.addEventListener("click", () => {
      input.click();
    });

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        img.src = event.target.result;
        if (placeholder) placeholder.style.display = "none";
      };
      reader.readAsDataURL(file);
    });
  });

  // Add new card button
  addCardBtn.addEventListener("click", () => {
    createVisionCard("New Card");
  });
});