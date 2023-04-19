function createCard (cat, el = box) {

			const card = document.createElement("div");
			card.className = "card";
			if (!cat.image) {
				card.classList.add("default");
			} else {
				card.style.backgroundImage = `url(${cat.image})`;
			}

			const name = document.createElement("h3");
			name.innerText = cat.name;
			const like = document.createElement("i");
			like.className = "fa-heart card__like";
			like.classList.add(cat.favorite ? "fa-solid" : "fa-regular");
			
			like.addEventListener("click", e => {
				e.stopPropagation();
				if (cat.id) {
				fetch(`${path}/update/${cat.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({favorite: !cat.favorite})
				})
				.then(res => {
					if (res.status === 200) {
						like.classList.toggle("fa-solid");
						like.classList.toggle("fa-regular");
						cats = cats.map(c => {
								if (c.id === cat.id) {
									c.favorite = !cat.favorite;
								}
								return c;
						})
						localStorage.setItem("cats-data", JSON.stringify(cats))
					}
				})
				}
			})

			const trash = document.createElement("i");
			trash.className = "fa-solid fa-trash card__trash";
			trash.addEventListener("click", e => {
				// deleteCard(???, e.currentTarget.parentElement)
				deleteCard(cat.id, card)
			})

			card.append(like, name, trash);
			if (cat.age >= 0) {
				const age = document.createElement("span");
				age.innerText = cat.age;
				card.append(age);
				}
			// card.addEventListener("click", (e) => {
			// 	deleteCard(cat.id, card)
			// });
			el.append(card);
}

function deleteCard(id, el) {
	if (id) {
		fetch(`${path}/delete/${id}`, {
			method: "delete"
		})
		.then(res => {
			// console.log(res.status);
			if (res.status === 200) {
				el.remove();
				cats = cats.filter(c => c.id !== id)
				localStorage.setItem("cats-data", JSON.stringify(cats))
			}
		})
	}
}
if (!cats) {
fetch(path + "/show")
	.then(function(res) {
		console.log(res);
		if (res.statusText === "OK") {
			return res.json();
		}
	})
	.then(function(data) {
		// console.log(data);
		if (!data.length) {
			box.innerHTML = "<div class=\"empty\">У вас пока нет питомца!</div>"
	} else {
		cats = [...data];
		localStorage.setItem("cats-data", JSON.stringify(data));
			for (let c of data) {
					createCard(c, box);
			}
	}
	})
}

// let ids = [];
// fetch(path + "/ids")
// 	.then(res => res.json())
// 	.then(data => {
// 		console.log(data);
// 		ids = [...data];
// 		myCat.id = ids[ids.length - 1] + 1;
// 		// addCat(myCat);
// 	})
function addCat(cat) {
	fetch(path + "/add", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(cat)
	}) 
			.then(res => res.json())
			.then(data => {
				console.log(data);
			})
}

function showCat (cat, el = infoBlock) {

	const catName = document.createElement("div");
	catName.className = "cat__name";
	const catText = document.createElement("div");
	catText.className = "cat__description";
	const trash = document.createElement("i");
	trash.className = "fa-solid fa-trash card__trash";
	trash.addEventListener("click", e => {
			deleteCard(cat.id, card)
	})

	infoBlock.append(catName, catAge, catText, trash);
	if (cat.catAge >= 0) {
		const catAge = document.createElement("div");
		catAge.innerText = cat.catAge;
		catAge.className = "cat__age";
		infoBlock.append(catAge);
		}
	// card.addEventListener("click", (e) => {
	// 	deleteCard(cat.id, card)
	// });
	el.append(showCat);
}





