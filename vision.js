// ============================
// VISION BOARD JS – Editable Images
// ============================

// Map each card’s file input to its image element
const cardMappings = [
  { inputId: "mealUpload", imgId: "mealImg" },
  { inputId: "outputUpload", imgId: "outputImg" },
  { inputId: "taskUpload", imgId: "taskImg" },
  { inputId: "workUpload", imgId: "workImg" },
  { inputId: "hobbyUpload", imgId: "hobbyImg" },
  { inputId: "priorityUpload", imgId: "priorityImg" },
  { inputId: "mindsetUpload", imgId: "mindsetImg" },
];

// Function to attach file upload event to an image
function handleImageUpload(inputEl, imgEl) {
  inputEl.addEventListener("change", () => {
    const file = inputEl.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      imgEl.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Attach upload handlers
cardMappings.forEach(({ inputId, imgId }) => {
  const inputEl = document.getElementById(inputId);
  const imgEl = document.getElementById(imgId);
  if (inputEl && imgEl) {
    handleImageUpload(inputEl, imgEl);
  }
});