// ===== ELEMENTS =====
const enterBtn = document.getElementById("enterRoomBtn");
const endBtn = document.getElementById("endSessionBtn");
const entry = document.getElementById("entry");
const focusRoom = document.getElementById("focusRoom");
const timerDisplay = document.getElementById("timer");

// ===== TIMER VARIABLES =====
let timer;
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

// ===== FORMAT TIME =====
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? "0" + mins : mins}:${secs < 10 ? "0" + secs : secs}`;
}

// ===== START TIMER =====
function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
    }
  }, 1000);
}

// ===== RESET TIMER =====
function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  timerDisplay.textContent = formatTime(timeLeft);
}

// ===== ENTER ROOM BUTTON =====
enterBtn.addEventListener("click", () => {
  entry.classList.add("hidden");
  focusRoom.classList.remove("hidden");
  startTimer();
});

// ===== LEAVE BUTTON =====
endBtn.addEventListener("click", () => {
  focusRoom.classList.add("hidden");
  entry.classList.remove("hidden");
  resetTimer();
const bgUpload = document.getElementById("bgUpload");
const backgroundLayer = document.getElementById("backgroundLayer");

const savedBackground = localStorage.getItem("roomBackground");

if(savedBackground){
backgroundLayer.style.backgroundImage = `url(${savedBackground})`;
}

bgUpload.addEventListener("change", function(){

const file = this.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

backgroundLayer.style.backgroundImage = `url(${e.target.result})`;

localStorage.setItem("roomBackground", e.target.result);

}

reader.readAsDataURL(file);
});
