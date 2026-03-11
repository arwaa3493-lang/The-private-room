// Get all card mappings
const cardMappings = [
  {inputId: "outfitUpload", imgId: "outfitImg"},
  {inputId: "hobbyUpload", imgId: "hobbyImg"},
  {inputId: "taskUpload", imgId: "taskImg"},
  {inputId: "workoutUpload", imgId: "workoutImg"},
  {inputId: "mealUpload", imgId: "mealImg"},
  {inputId: "priorityUpload", imgId: "priorityImg"},
  {inputId: "mindsetUpload", imgId: "mindsetImg"},
];

// Function to handle image upload preview
function handleImageUpload(inputEl, imgEl) {
  inputEl.addEventListener("change", () => {
    const file = inputEl.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      imgEl.src = e.target.result;  // Set image preview
    };
    reader.readAsDataURL(file);
  });
}

// Attach handlers to all cards
cardMappings.forEach(({inputId, imgId}) => {
  const inputEl = document.getElementById(inputId);
  const imgEl = document.getElementById(imgId);
  handleImageUpload(inputEl, imgEl);
});