// =========================
// THE PRIVATE ROOM + VISUAL BOARD – CLEAN JS
// =========================

// ---- ELEMENTS ----
const entrySection = document.getElementById("entry");
const focusRoom = document.getElementById("focusRoom");
const enterBtn = document.getElementById("enterRoomBtn");
const leaveBtn = document.getElementById("endSessionBtn");
const input = document.getElementById("avoidanceInput");
const timerEl = document.getElementById("timer");
const whisperEl = document.getElementById("whisperText");
const visualBoard = document.getElementById("visualBoard");

// ---- TIMER STATE ----
const SESSION_MINUTES = 25;
let totalSeconds = SESSION_MINUTES * 60;
let timerInterval = null;

// ---- WHISPERS ----
const whispers = {
  1500: "Begin without adjusting anything.",
  1200: "Your mind is louder before it settles.",
  900:  "This discomfort is temporary.",
  600:  "You are already past the hardest part.",
  300:  "Finish clean. No rushing."
};

// ---- FORMAT TIME ----
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// ---- START TIMER ----
function startTimer() {
  timerEl.textContent = formatTime(totalSeconds);
  whisperEl.textContent = whispers[totalSeconds] || "Focus now.";

  timerInterval = setInterval(() => {
    totalSeconds--;
    timerEl.textContent = formatTime(totalSeconds);

    if (whispers[totalSeconds]) {
      whisperEl.textContent = whispers[totalSeconds];
    }

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      whisperEl.textContent = "You stayed. That matters.";
    }
  }, 1000);
}

// ---- ENTER ROOM ----
function enterRoom() {
  if (input.value.trim() === "") {
    input.focus();
    return;
  }

  entrySection.style.display = "none";
  focusRoom.style.display = "block";

  startTimer();
}

// ---- LEAVE ROOM ----
function leaveRoom() {
  clearInterval(timerInterval);

  totalSeconds = SESSION_MINUTES * 60;
  timerEl.textContent = formatTime(totalSeconds);
  whisperEl.textContent = "You don’t need motivation. You need presence.";

  focusRoom.style.display = "none";
  entrySection.style.display = "block";
}

// ---- EVENTS ----
enterBtn.addEventListener("click", enterRoom);
leaveBtn.addEventListener("click", leaveRoom);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") enterRoom();
});

// =========================
// VISUAL BOARD
// =========================

// Create button once DOM is loaded
document.addEventListener("DOMContentLoaded", () => {

  const visualEnterBtn = document.createElement("button");
  visualEnterBtn.textContent = "Enter Visual Day";
  visualEnterBtn.style.marginTop = "2rem";

  entrySection.appendChild(visualEnterBtn);

  visualEnterBtn.addEventListener("click", () => {
    visualBoard.style.display = "grid";
    setTimeout(() => {
      visualBoard.classList.add("active");
    }, 10);
  });

});

// ---- IMAGE UPLOAD HANDLER ----
function handleImageUpload(inputEl, imgEl) {
  if (!inputEl || !imgEl) return;

  inputEl.addEventListener("change", () => {
    const file = inputEl.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      imgEl.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ---- ATTACH UPLOADS ----
const cardMappings = [
  {inputId: "outfitUpload", imgId: "outfitImg"},
  {inputId: "hobbyUpload", imgId: "hobbyImg"},
  {inputId: "taskUpload", imgId: "taskImg"},
  {inputId: "workoutUpload", imgId: "workoutImg"},
  {inputId: "mealUpload", imgId: "mealImg"},
  {inputId: "priorityUpload", imgId: "priorityImg"},
];

cardMappings.forEach(({inputId, imgId}) => {
  const inputEl = document.getElementById(inputId);
  const imgEl = document.getElementById(imgId);
  handleImageUpload(inputEl, imgEl);
});