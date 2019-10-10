const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const toyFormSubmit = document.querySelector(".submit")

let addToy = false

function addToyCard(toy){
  let newCard = toyCollection.insertAdjacentHTML("beforeend",
    `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p><span class="likesCount"> ${toy.likes} </span></p>
      <button data-action="like" data-id=${toy.id} class="like-btn">Like <3</button>
    </div>`)
}


fetch('http://localhost:3000/toys') 
  .then(function(response){
    return response.json()
  })
  .then(function(json){
    json.forEach(function(toy){
      return addToyCard(toy)
    })
  })

addBtn.addEventListener('click', () => {

  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

toyFormSubmit.addEventListener('click', function(event){
  let toyName = document.querySelector("#toy-name")
  let toyImage = document.querySelector("#toy-image")

  fetch('http://localhost:3000/toys',{
    method: "POST",
    headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    body: 
      JSON.stringify({
        name: toyName.value,
        image: toyImage.value,
        likes: 0
      })
  })
})

toyCollection.addEventListener('click', function(event){
  if (event.target.dataset.action === "like"){
    
    let likesCount = event.target.previousElementSibling.firstElementChild.innerText  
    let newLikeCount = parseInt(likesCount) + 1
    let toyId = event.target.dataset.id
  
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: 
        {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body:
          JSON.stringify({
          likes: newLikeCount
        })
    })
  
    let likes = event.target.previousElementSibling.firstElementChild
    likes.innerText = newLikeCount
  }
})
