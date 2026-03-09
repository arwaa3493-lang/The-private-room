// ============================
// VISION BOARD JS – Editable Images
// ============================

const cardMappings = [
  { inputId: "mealUpload", imgId: "mealImg" },
  { inputId: "outputUpload", imgId: "outputImg" },
  { inputId: "taskUpload", imgId: "taskImg" },
  { inputId: "workUpload", imgId: "workImg" },
  { inputId: "hobbyUpload", imgId: "hobbyImg" },
  { inputId: "priorityUpload", imgId: "priorityImg" },
  { inputId: "mindsetUpload", imgId: "mindsetImg" },
];

// Function to attach file upload
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

  // Make image clickable
  imgEl.addEventListener("click", () => inputEl.click());
}

// Attach handlers
cardMappings.forEach(({ inputId, imgId }) => {
  const inputEl = document.getElementById(inputId);
  const imgEl = document.getElementById(imgId);
  if (inputEl && imgEl) handleImageUpload(inputEl, imgEl);
const inputs = document.querySelectorAll("input[type='file']");

inputs.forEach(input => {

input.addEventListener("change", function(){

const file = this.files[0];
if(!file) return;

const previewId = this.dataset.preview;
const img = document.getElementById(previewId);

const reader = new FileReader();

reader.onload = function(e){
img.src = e.target.result;
};

reader.readAsDataURL(file);

});

});