// =========================
// THE PRIVATE ROOM – JS
// =========================

const entrySection = document.getElementById("entry");
const focusRoom = document.getElementById("focusRoom");
const enterBtn = document.getElementById("enterRoomBtn");
const leaveBtn = document.getElementById("endSessionBtn");
const input = document.getElementById("avoidanceInput");
const timerEl = document.getElementById("timer");
const whisperEl = document.getElementById("whisperText");

let timerInterval = null;
let totalSeconds = 25 * 60;

const whispers = [
  "Stay with it.",
  "Discomfort means you are close.",
  "Do not negotiate with distraction.",
  "This is the work.",
  "You can rest after truth."
];

// ---- FORMAT TIME ----
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// ---- START TIMER ----
function startTimer() {
  timerEl.textContent = formatTime(totalSeconds);

  timerInterval = setInterval(() => {
    totalSeconds--;

    timerEl.textContent = formatTime(totalSeconds);

    // change whisper every 5 minutes
    if (totalSeconds % 300 === 0) {
      const random = Math.floor(Math.random() * whispers.length);
      whisperEl.textContent = whispers[random];
    }

    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      whisperEl.textContent = "You stayed. That matters.";
    }
  }, 1000);
}

// ---- ENTER ROOM ----
enterBtn.addEventListener("click", () => {
  if (input.value.trim() === "") {
    input.focus();
    return;
  }

  // fade out entry
  entrySection.style.opacity = "0";
  entrySection.style.pointerEvents = "none";

  setTimeout(() => {
    entrySection.style.display = "none";
    focusRoom.classList.remove("locked");
    focusRoom.style.display = "block";
    startTimer();
  }, 500);
});

// ---- LEAVE ROOM ----
leaveBtn.addEventListener("click", () => {
  clearInterval(timerInterval);

  // reset state
  totalSeconds = 25 * 60;
  timerEl.textContent = "25:00";
  whisperEl.textContent = "You don’t need motivation. You need presence.";

  focusRoom.style.display = "none";
  focusRoom.classList.add("locked");

  entrySection.style.display = "block";
  setTimeout(() => {
    entrySection.style.opacity = "1";
    entrySection.style.pointerEvents = "auto";
  }, 50);

  input.value = "";
});