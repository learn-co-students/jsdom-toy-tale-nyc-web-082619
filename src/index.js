const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const addToyForm = document.querySelector(".add-toy-form");
const toyCollection = document.querySelector("#toy-collection");

const toysPath = "http://localhost:3000/toys";
const toyPath = id => {
  return `http://localhost:3000/toys/${id}`;
};

let addToy = false;

addBtn.addEventListener("click", e => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

addToyForm.addEventListener("submit", e => {
  e.preventDefault();

  const content = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    })
  };

  window
    .fetch(toysPath, content)
    .then(e => e.json())
    .then(renderToy)
    .catch(alert);
});

toyCollection.addEventListener("click", e => {
  if (e.target.className === "like-btn") {
    const card = e.target.parentElement;
    const likeElement = card.querySelector("p");
    const newNum = parseInt(likeElement.innerText) + 1;
    const newText = newNum + " Likes";
    likeElement.innerText = newText;

    const content = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

      body: JSON.stringify({
        likes: newNum
      })
    };

    window.fetch(toyPath(card.dataset.id), content).catch(alert);
  }
});

fetch(toysPath)
  .then(e => e.json())
  .then(e => e.forEach(renderToy));

function renderToy(toy) {
  const div = document.createElement("div");
  div.className = "card";
  div.dataset.id = toy.id;

  const h2 = document.createElement("h2");
  h2.innerText = toy.name;
  div.append(h2);

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";
  div.append(img);

  const p = document.createElement("p");
  p.innerText = toy.likes + " Likes";
  div.append(p);

  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like";
  div.append(button);

  toyCollection.append(div);
}
