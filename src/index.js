const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection')
const createToy = document.querySelector('.submit')
console.log(createToy)



fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    data.forEach(function(toy){
      toyCollection.insertAdjacentHTML('beforeend',`
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
       <span class='count'> <p>${toy.likes} </p></span>
        <button data-id=${toy.id} class="like-btn">Like <3</button>
      </div>
      `)
    })
  })
  
  createToy.addEventListener('click', function(event){
    const toyName = document.querySelector('#toy-name')
    const toyImage = document.querySelector('#toy-image')
    // console.log(createToy)
    // console.log(toyName)
    // console.log(toyImage)
      debugger
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers: 
        {
          "Content-Type": "application/json",
          'Accept': "application/json"
        },
         
        body: JSON.stringify(
        {
          "name": toyName.value,
          "image": toyImage.value,
          "likes": 0
        })

      }) //end of fetch
  }) // end of button listener
  

toyCollection.addEventListener('click', function(event){
  debugger
  if (event.target.innerText === "Like <3"){
    let span = event.target.closest(".card").querySelector('span.count')
    let newCount = parseInt(span.innerText)+1
    fetch(`http://localhost:3000/toys/${event.target.dataset.id}`,{
      method: 'PATCH',
      headers: 
      {
        "Content-Type": "application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({likes: newCount})
    })
    span.innerText = newCount
  }

})


addBtn.addEventListener('click', () => {
 
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
