const addBtn = document.querySelector('#new-toy-btn')
const toyFormC = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.add-toy-form')

fetch('http://localhost:3000/toys').then(function(response){
  return response.json()
}).then(function(data){
  data.forEach(element => {
    let h2 = document.createElement('h2')
    h2.innerText = element.name
  
    let img = document.createElement('img')
    img.setAttribute('src', element.image)
    img.setAttribute('class', 'toy-avatar')
  
    let likes = element.likes ? element.likes : 0;
    let p = document.createElement('p')
    p.innerText = `${likes} likes`
  
    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', element.id)
    btn.innerText = "like"
    btn.addEventListener('click', onLike)
  
    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, btn)
    toyCollection.append(divCard)
  });
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormC.style.display = 'block'
  } else {
    toyFormC.style.display = 'none'
  }
})

toyForm.addEventListener("submit", e => {
    event.preventDefault();
    let name = toyForm.name;
    let img = toyForm.image;
    doFetch('/toys', 'POST', {
      name: name.value,
      image: img.value,
      likes: 0
    });
})

function onLike(e) {
  let btn = e.target;
  let p = btn.parentElement.getElementsByTagName('p')[0];
  let likes = parseInt(p.innerText) + 1;
  doFetch('/toys/' + btn.id, 'PATCH', {likes: likes})
    .then(resp => p.innerText = likes + ' likes')
}

function doFetch(endpoint, method, data) {
  return fetch(`http://localhost:3000` + endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    },
    body: JSON.stringify(data)
  })
}