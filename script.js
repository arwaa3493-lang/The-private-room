// =========================
// THE PRIVATE ROOM – JS (FINAL)
// =========================

// ---- ELEMENTS ----
const entrySection = document.getElementById("entry");
const focusRoom = document.getElementById("focusRoom");
const enterBtn = document.getElementById("enterRoomBtn");
const leaveBtn = document.getElementById("endSessionBtn");
const input = document.getElementById("avoidanceInput");
const timerEl = document.getElementById("timer");
const whisperEl = document.getElementById("whisperText");

// ---- TIMER STATE ----
const SESSION_MINUTES = 25;
let totalSeconds = SESSION_MINUTES * 60;
let timerInterval = null;

// ---- TIME-ALIGNED WHISPERS ----
const whispers = {
  1500: "Begin without adjusting anything.",      // 25:00
  1200: "Your mind is louder before it settles.", // 20:00
  900:  "This discomfort is temporary.",          // 15:00
  600:  "You are already past the hardest part.", // 10:00
  300:  "Finish clean. No rushing."                // 05:00
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
  whisperEl.textContent = whispers[totalSeconds];

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

  // fade out entry
  entrySection.style.opacity = "0";
  entrySection.style.pointerEvents = "none";

  setTimeout(() => {
    entrySection.style.display = "none";

    focusRoom.classList.remove("locked");
    focusRoom.style.display = "block";

    // soft lock outside world
    document.body.style.pointerEvents = "none";
    focusRoom.style.pointerEvents = "auto";

    startTimer();
  }, 500);
}

// ---- LEAVE ROOM ----
function leaveRoom() {
  clearInterval(timerInterval);

  // reset timer state
  totalSeconds = SESSION_MINUTES * 60;
  timerEl.textContent = formatTime(totalSeconds);
  whisperEl.textContent = "You don’t need motivation. You need presence.";

  // unlock world
  document.body.style.pointerEvents = "auto";

  // reset UI
  focusRoom.style.display = "none";
  focusRoom.classList.add("locked");

  entrySection.style.display = "block";
  setTimeout(() => {
    entrySection.style.opacity = "1";
    entrySection.style.pointerEvents = "auto";
  }, 50);

  input.value = "";
}

// ---- EVENTS ----
enterBtn.addEventListener("click", enterRoom);

leaveBtn.addEventListener("click", leaveRoom);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    enterRoom();
  }
});