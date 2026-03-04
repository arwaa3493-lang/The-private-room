const habitContainer = document.getElementById("habitContainer");
const addHabitBtn = document.getElementById("addHabitBtn");
const newHabitInput = document.getElementById("newHabitInput");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Save to localStorage
function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// Create habit row
function renderHabits() {
  habitContainer.innerHTML = "";

  habits.forEach((habit, habitIndex) => {
    const row = document.createElement("div");
    row.className = "habit-row";

    const name = document.createElement("input");
    name.type = "text";
    name.value = habit.name;
    name.className = "habit-name";

    name.addEventListener("change", () => {
      habits[habitIndex].name = name.value;
      saveHabits();
    });

    const boxes = document.createElement("div");
    boxes.className = "habit-boxes";

    habit.days.forEach((day, dayIndex) => {
      const box = document.createElement("div");
      box.className = "box";
      if (day) box.classList.add("active");

      box.addEventListener("click", () => {
        habits[habitIndex].days[dayIndex] = !habits[habitIndex].days[dayIndex];
        saveHabits();
        renderHabits();
      });

      boxes.appendChild(box);
    });

    row.appendChild(name);
    row.appendChild(boxes);
    habitContainer.appendChild(row);
  });
}

// Add habit
addHabitBtn.addEventListener("click", () => {
  const habitName = newHabitInput.value.trim();
  if (!habitName) return;

  habits.push({
    name: habitName,
    days: [false, false, false, false, false, false, false]
  });

  newHabitInput.value = "";
  saveHabits();
  renderHabits();
});

renderHabits();