const addSessionBtn = document.getElementById("addSessionBtn");
const sessionsContainer = document.getElementById("sessionsContainer");

addSessionBtn.addEventListener("click", function () {

const session = document.createElement("div");
session.className = "session-card";

session.innerHTML = `
<input type="text" placeholder="Session name">
<button class="delete-session">Delete</button>
`;

sessionsContainer.appendChild(session);

session.querySelector(".delete-session").addEventListener("click", function () {
session.remove();
});

});

const timerDisplay = document.getElementById("timerDisplay");
const startTimer = document.getElementById("startTimer");
const resetTimer = document.getElementById("resetTimer");

let time = 1500;
let timer;

function updateDisplay() {

const minutes = Math.floor(time / 60);
const seconds = time % 60;

timerDisplay.textContent =
String(minutes).padStart(2,"0") + ":" +
String(seconds).padStart(2,"0");

}

startTimer.addEventListener("click", function () {

if(timer) return;

timer = setInterval(function () {

if(time > 0){
time--;
updateDisplay();
}

},1000);

});

resetTimer.addEventListener("click", function () {

clearInterval(timer);
timer = null;
time = 1500;
updateDisplay();

});
