const focusRoom = document.getElementById("focusRoom");
const addSessionBtn = document.getElementById("addSessionBtn");
const sessionInput = document.getElementById("sessionInput");

function createSession(title) {

const session = document.createElement("div");
session.className = "session";

const span = document.createElement("span");
span.textContent = title;
span.contentEditable = true;
span.className = "session-title";

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "✕";
deleteBtn.className = "delete-session";

deleteBtn.addEventListener("click", () => {
session.remove();
});

session.appendChild(deleteBtn);
session.appendChild(span);

return session;
}

addSessionBtn.addEventListener("click", () => {

let title = sessionInput.value.trim();

if (title === "") {
title = "New Session";
}

const newSession = createSession(title);
focusRoom.appendChild(newSession);

sessionInput.value = "";

});