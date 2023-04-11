const box = document.querySelector(".container");
const addBtn = document.querySelector(".add-btn");
const mdBox = document.querySelector(".modal-container");
const mdClose = mdBox.querySelector(".modal-close");
const addForm = document.forms.add;

let user = localStorage.getItem("cat13");

if (!user) {
	user = prompt("Ваше уникальное имя: ", "mantissa13");
	localStorage.setItem("cat13", user);
}

const path = `https://cats.petiteweb.dev/api/single/${user}`;
// const path = `https://cats.petiteweb.dev/api/single/mantissa13`;

let cats = localStorage.getItem("cats-data")
console.log(cats);
if (cats) {
	try {
	cats = JSON.parse(cats);
	console.log(cats);
	for (let cat of cats) {
		createCard(cat);
		}
	} catch(err) {
		if (err) {
		cats = null;
		}
	}
}

