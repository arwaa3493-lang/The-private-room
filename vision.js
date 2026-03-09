const board = document.getElementById("visionBoard");
const upload = document.getElementById("imageUpload");

upload.addEventListener("change", e => {

const file = e.target.files[0];
if(!file) return;

const reader = new FileReader();

reader.onload = function(event){

const card = document.createElement("div");
card.className = "vision-card";

const img = document.createElement("img");
img.src = event.target.result;

card.appendChild(img);
board.appendChild(card);

saveImages();

};

reader.readAsDataURL(file);

});

function saveImages(){

const images = [];
document.querySelectorAll(".vision-card img").forEach(img=>{
images.push(img.src);
});

localStorage.setItem("visionImages", JSON.stringify(images));

}

function loadImages(){

const saved = JSON.parse(localStorage.getItem("visionImages")) || [];

saved.forEach(src=>{
const card = document.createElement("div");
card.className="vision-card";

const img=document.createElement("img");
img.src=src;

card.appendChild(img);
board.appendChild(card);
});

}

loadImages();