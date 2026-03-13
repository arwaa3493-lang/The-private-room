const sessionGrid = document.getElementById("sessionGrid")
const addSession = document.getElementById("addSession")
const sessionName = document.getElementById("sessionName")

const timerDisplay = document.getElementById("timer")
const startBtn = document.getElementById("startTimer")
const resetBtn = document.getElementById("resetTimer")

const trackerGrid = document.getElementById("trackerGrid")

let sessions = JSON.parse(localStorage.getItem("sessions")) || []

let timer
let time = 1500
let activeSession = null


function renderSessions(){

sessionGrid.innerHTML=""

sessions.forEach((name,index)=>{

const card=document.createElement("div")

card.className="session-card"

card.textContent=name

card.onclick=()=>{

activeSession=index

document.getElementById("timerTitle").textContent=name

}

sessionGrid.appendChild(card)

})

}


addSession.onclick=()=>{

const name=sessionName.value.trim()

if(name==="")return

sessions.push(name)

localStorage.setItem("sessions",JSON.stringify(sessions))

sessionName.value=""

renderSessions()

}


function updateTimer(){

let minutes=Math.floor(time/60)

let seconds=time%60

timerDisplay.textContent=

String(minutes).padStart(2,"0")+":"+String(seconds).padStart(2,"0")

}


startBtn.onclick=()=>{

if(activeSession===null)return

timer=setInterval(()=>{

time--

updateTimer()

if(time===0){

clearInterval(timer)

completeSession()

}

},1000)

}


resetBtn.onclick=()=>{

clearInterval(timer)

time=1500

updateTimer()

}


function buildTracker(){

trackerGrid.innerHTML=""

for(let i=0;i<7;i++){

const box=document.createElement("div")

box.className="day-box"

trackerGrid.appendChild(box)

}

}
function createSession(title = "New Session") {

    const session = document.createElement("div");
    session.className = "session";

    session.innerHTML = `
        <span class="session-title" contenteditable="true">${title}</span>
        <button class="delete-session">✕</button>
    `;

    // delete logic
    session.querySelector(".delete-session").addEventListener("click", () => {
        session.remove();
    });

    return session;
}


function completeSession(){

const today=new Date().getDay()

const boxes=document.querySelectorAll(".day-box")

boxes[today].classList.add("completed")

time=1500

updateTimer()

}


renderSessions()

buildTracker()

updateTimer()