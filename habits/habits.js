const habitGrid = document.getElementById("habitGrid");
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");

/* Load habits from browser storage */

let habits = JSON.parse(localStorage.getItem("habits")) || [];

/* Save habits */

function saveHabits(){

localStorage.setItem("habits", JSON.stringify(habits));

}

/* Render habits */

function renderHabits(){

habitGrid.innerHTML = "";

habits.forEach((habit,index)=>{

const card = document.createElement("div");
card.className = "habit-card";

/* editable habit name */

const title = document.createElement("div");
title.textContent = habit;
title.contentEditable = true;

/* save edited text */

title.addEventListener("blur",()=>{

habits[index] = title.textContent;

saveHabits();

});

/* checkbox */

const check = document.createElement("div");
check.textContent = "⬜";
check.style.fontSize = "22px";
check.style.cursor = "pointer";

check.onclick = ()=>{

check.textContent =
check.textContent === "⬜" ? "✅" : "⬜";

};

/* delete button */

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";

deleteBtn.onclick = ()=>{

habits.splice(index,1);

saveHabits();

renderHabits();

};

/* assemble card */

card.appendChild(title);
card.appendChild(check);
card.appendChild(deleteBtn);

habitGrid.appendChild(card);

});

}

/* Add habit */

addHabitBtn.onclick = ()=>{

const newHabit = habitInput.value.trim();

if(newHabit === "") return;

habits.push(newHabit);

habitInput.value = "";

saveHabits();

renderHabits();

};

/* Initial render */

renderHabits();
