const board = document.getElementById("visionBoard")
const addBtn = document.getElementById("addCardBtn")

let cards = JSON.parse(localStorage.getItem("visionCards")) || []


function saveCards(){

localStorage.setItem("visionCards", JSON.stringify(cards))

}


function createCard(cardData, index){

const card = document.createElement("div")
card.className = "vision-card"


const title = document.createElement("h3")
title.className = "editable-title"
title.contentEditable = true
title.innerText = cardData.title || "New Vision"


title.addEventListener("input", () => {

cards[index].title = title.innerText
saveCards()

})


const upload = document.createElement("label")
upload.className = "upload-box"


const input = document.createElement("input")
input.type = "file"
input.accept = "image/*"


const span = document.createElement("span")
span.innerText = "Upload an image"


input.addEventListener("change", () => {

const file = input.files[0]

const reader = new FileReader()

reader.onload = function(e){

cards[index].image = e.target.result
saveCards()

renderBoard()

}

reader.readAsDataURL(file)

})


upload.appendChild(input)


if(cardData.image){

const img = document.createElement("img")
img.src = cardData.image
upload.appendChild(img)

}else{

upload.appendChild(span)

}


card.appendChild(title)
card.appendChild(upload)

board.appendChild(card)

}


function renderBoard(){

board.innerHTML = ""

cards.forEach((card, index) => {

createCard(card, index)

})

}


addBtn.onclick = () => {

cards.push({

title:"New Vision",

image:null

})

saveCards()

renderBoard()

}


renderBoard()