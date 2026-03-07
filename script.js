<!-- Include FontAwesome for Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<script>
  // 1. DRAG AND DROP LOGIC
  const board = document.getElementById('visualBoard');
  let draggedItem = null;

  board.addEventListener('dragstart', (e) => {
    draggedItem = e.target.closest('.card');
    setTimeout(() => draggedItem.classList.add('dragging'), 0);
  });

  board.addEventListener('dragend', () => {
    setTimeout(() => {
      draggedItem.classList.remove('dragging');
      draggedItem = null;
    }, 0);
  });

  board.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(board, e.clientY);
    if (afterElement == null) {
      board.appendChild(draggedItem);
    } else {
      board.insertBefore(draggedItem, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  // 2. IMAGE UPLOAD LOGIC
  document.querySelectorAll('.card input[type="file"]').forEach(input => {
    input.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = this.closest('.card').querySelector('img');
          img.src = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    });
  });

  // 3. TAG TOGGLE LOGIC
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // 4. FOCUS MODE LOGIC
  const focusBtn = document.getElementById('focusBtn');
  const focusOverlay = document.getElementById('focusOverlay');
  let timerInterval;

  focusBtn.addEventListener('click', () => {
    focusOverlay.classList.toggle('active');
    if(focusOverlay.classList.contains('active')) {
      startTimer();
    } else {
      clearInterval(timerInterval);
    }
  });

  function startTimer() {
    let time = 25 * 60; // 25 minutes
    const display = document.querySelector('.focus-timer');
    
    timerInterval = setInterval(() => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      time--;
      if (time < 0) clearInterval(timerInterval);
    }, 1000);
  }
</script>
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
