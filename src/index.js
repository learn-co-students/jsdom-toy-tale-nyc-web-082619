const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysList = document.querySelector("div#toy-collection");
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
function renderToy(toy){
  toysList.insertAdjacentHTML("beforeend", `
    <div data-id='${toy.id}' class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes} ${toy.likes === 1 || toy.likes === -1? "Like" : "Likes"}</p>
      <button class="like-btn">Like <3</button>
    </div>
  `)
}
function renderToys(toys){
  toys.forEach(renderToy)
}

function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => renderToys(data))
}

function addNewToy(form){
  const newToy = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {name: form.name.value,
      image: form.image.value,
      likes: 0
      })
  }

  fetch("http://localhost:3000/toys", newToy)
  .then(object => object.json())
  .then(renderToy)
}

function addLike(button){
  const toyCard = button.closest("div.card")
  const likeNode = toyCard.querySelector("p")
  const newCount = parseInt(likeNode.innerHTML) + 1

  const newData = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
      likes: newCount
      })
  }
  fetch(`http://localhost:3000/toys/${toyCard.dataset.id}`, newData);
  likeNode.innerText = `${newCount} ${newCount === 1 || newCount === -1? "Like" : "Likes"}`
}


document.addEventListener("DOMContentLoaded", fetchToys)

toyForm.addEventListener("submit", function(event){
  event.preventDefault();
  addNewToy(event.target);
})

toysList.addEventListener("click", function(event){
  event.preventDefault();
  if(event.target.className === "like-btn"){addLike(event.target)}
})
// fetchToys()