const habits = [
"Study",
"Workout",
"Read",
"Journal",
"Drink Water",
"Sleep Early"
];

const grid = document.getElementById("habitGrid");

habits.forEach(habit=>{

const card=document.createElement("div");
card.className="habit-card";

const title=document.createElement("h4");
title.textContent=habit;

const check=document.createElement("span");
check.textContent="⬜";

check.onclick=()=>{
check.textContent = check.textContent==="⬜" ? "✅" : "⬜";
};

card.appendChild(title);
card.appendChild(check);

grid.appendChild(card);

});

const date = new Date();
document.getElementById("calendar").textContent = date.toDateString();
document.getElementById("weekday").textContent = date.toLocaleDateString("en",{weekday:"long"}) + " Tasks";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.getElementById("addTask").onclick = () => {

if(taskInput.value==="") return;

const li=document.createElement("li");
li.textContent=taskInput.value;

taskList.appendChild(li);

taskInput.value="";
};