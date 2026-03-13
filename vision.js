document.addEventListener("DOMContentLoaded", function () {

  const visionBoard = document.getElementById("visionBoard");
  const addCardBtn = document.getElementById("addCardBtn");

  function setupCard(card) {

    const input = card.querySelector(".image-input");
    const preview = card.querySelector(".preview");
    const uploadText = card.querySelector(".upload-text");
    const title = card.querySelector("h3");

    // Image Upload
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

    // Editable title already handled by contenteditable
  }

  // Initialize existing cards
  document.querySelectorAll(".vision-card").forEach(card => {
    setupCard(card);
  });

  // Add new card
  addCardBtn.addEventListener("click", function () {

    const newCard = document.createElement("div");
    newCard.className = "vision-card";

    newCard.innerHTML = `
      <h3 contenteditable="true">New Vision</h3>

      <label class="upload-box">
        <input type="file" accept="image/*" class="image-input">
        <span class="upload-text">Upload an image</span>
      </label>

      <img class="preview">
    `;

    visionBoard.appendChild(newCard);

    setupCard(newCard);

  });

});