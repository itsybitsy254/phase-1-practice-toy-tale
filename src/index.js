let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyObj = document.querySelector('input.value').addEventListener('submit', 
  function renderOneToy(toy){
    //build toy
    toy = {
      name:'',
      image:'',
      likes:'',
    }
    let card = document.getElementsById('toy-collection')
  
    card.innerHTML = 
      <div class="card">
        <h2>Woody</h2>
        <img src="[toy_image_url]" class="toy-avatar" />
        <p> <span>4</span> Likes</p>
        <button class="like-btn" id="toy_id">Like ❤️</button>
      </div>

    card.querySelector('#toy-id').addEventListener('click', ()=> {
      likeUpdate +=1
      card.querySelector('span').textContent = likeUpdate
    })
    //Add toy-card to DOM
    document.querySelector('#toy-collection').appendChild(card)
  }
  
)


////fetch all toys
function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toyData => toyData.forEach (toy => renderOneToy(toy)))
}
/// add toy
function addToy(toyObj){
  fetch('http://localhost:3000', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
    
  })
  .then(response => response.json())
  .then(toy =>{
    const newToy = document.querySelector('#toy-collection').appendChild(toy)
    return newToy
  })
}


//add Likes
function likes(toyObj){
  fetch('http://localhost:3000/${toyObj.id}',{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(response => response.json())
  .then(toy => {
    return toy
  })
}

function initialize(){
  getAllToys();
  addToy(toyObj);
  likes(toyObj);
}
document.addEventListener('DOMContentLoaded', initialize)