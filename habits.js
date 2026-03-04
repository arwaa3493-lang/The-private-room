// ===== DATE & CALENDAR =====
const dateElement = document.getElementById("currentDate");
const todoHeader = document.getElementById("todoHeader");

const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateElement.textContent = today.toLocaleDateString(undefined, options);
todoHeader.textContent = today.toLocaleDateString(undefined, { weekday: 'long' }) + " Tasks";

// ===== TO DO LIST =====
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;

    if (todo.done) {
      li.classList.add("done");
    }

    li.addEventListener("click", () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    });

    todoList.appendChild(li);
  });
}

addTodoBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  todoInput.value = "";
  saveTodos();
  renderTodos();
});

renderTodos();


// ===== HABITS =====
const habitContainer = document.getElementById("habitContainer");
const addHabitBtn = document.getElementById("addHabitBtn");
const newHabitInput = document.getElementById("newHabitInput");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

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
      box.textContent = day ? "✅" : "";

      box.addEventListener("click", () => {
        habits[habitIndex].days[dayIndex] = !habit.days[dayIndex];
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