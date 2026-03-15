const board = document.getElementById("board");
const modal = document.getElementById("modal");

const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const imageInput = document.getElementById("imageInput");

const addBtn = document.getElementById("addCardBtn");
const saveBtn = document.getElementById("saveCard");
const closeBtn = document.getElementById("closeModal");

let cards = JSON.parse(localStorage.getItem("visionCards")) || [];

let editIndex = null;



function saveStorage(){
localStorage.setItem("visionCards", JSON.stringify(cards));
}



function renderCards(){

board.innerHTML = "";

cards.forEach((card,index)=>{

const div = document.createElement("div");
div.className = "card";

div.innerHTML = `

<img src="${card.image}">

<h3>${card.title}</h3>

<p>${card.desc}</p>

<div class="card-actions">

<button onclick="editCard(${index})">Edit</button>

<button onclick="deleteCard(${index})">Delete</button>

</div>

`;

board.appendChild(div);

});

}



addBtn.onclick = () => {

modal.classList.remove("hidden");

editIndex = null;

titleInput.value = "";
descInput.value = "";
imageInput.value = "";

};



closeBtn.onclick = () => {

modal.classList.add("hidden");

};



saveBtn.onclick = () => {

const newCard = {

title: titleInput.value,

desc: descInput.value,

image: imageInput.value

};

if(editIndex === null){

cards.push(newCard);

}else{

cards[editIndex] = newCard;

}

saveStorage();

renderCards();

modal.classList.add("hidden");

};



function deleteCard(i){

cards.splice(i,1);

saveStorage();

renderCards();

}



function editCard(i){

const card = cards[i];

titleInput.value = card.title;
descInput.value = card.desc;
imageInput.value = card.image;

editIndex = i;

modal.classList.remove("hidden");

}



renderCards();