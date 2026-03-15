// ELEMENTS
const entry = document.getElementById("entry");
const focusRoom = document.getElementById("focusRoom");
const visualBoard = document.getElementById("visualBoard");

const enterBtn = document.getElementById("enterRoomBtn");
const leaveBtn = document.getElementById("endSessionBtn");
const visualBtn = document.getElementById("visualBtn");

const input = document.getElementById("avoidanceInput");
const timerEl = document.getElementById("timer");
const whisperEl = document.getElementById("whisperText");

// TIMER
let totalSeconds = 1500;
let interval = null;

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}

function startTimer() {
  timerEl.textContent = formatTime(totalSeconds);

  interval = setInterval(() => {
    totalSeconds--;
    timerEl.textContent = formatTime(totalSeconds);

    if (totalSeconds <= 0) {
      clearInterval(interval);
      whisperEl.textContent = "You stayed. That matters.";
    }
  }, 1000);
}

// ENTER PRIVATE ROOM
enterBtn.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  entry.classList.add("hidden");
  focusRoom.classList.remove("hidden");
  startTimer();
});

// LEAVE PRIVATE ROOM
leaveBtn.addEventListener("click", () => {
  clearInterval(interval);
  totalSeconds = 1500;
  timerEl.textContent = "25:00";
  focusRoom.classList.add("hidden");
  entry.classList.remove("hidden");
});

// VISUAL BOARD BUTTON
visualBtn.addEventListener("click", () => {
  visualBoard.classList.toggle("hidden");
});

// IMAGE UPLOADS
function connectUpload(inputId, imgId) {
  const input = document.getElementById(inputId);
  const img = document.getElementById(imgId);

  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => img.src = e.target.result;
    reader.readAsDataURL(file);
  });
}

connectUpload("outfitUpload", "outfitImg");
connectUpload("hobbyUpload", "hobbyImg");
connectUpload("taskUpload", "taskImg");
connectUpload("workoutUpload", "workoutImg");
connectUpload("mealUpload", "mealImg");
connectUpload("priorityUpload", "priorityImg");
