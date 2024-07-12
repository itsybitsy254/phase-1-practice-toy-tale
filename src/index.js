let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy =!addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyForm = document.querySelector("form");
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const toyName = document.querySelector("#toy-name").value;
    const toyImage = document.querySelector("#toy-image").value;
    const toyLikes = 0;

    const toyObj = {
      name: toyName,
      image: toyImage,
      likes: toyLikes,
    };

    addToy(toyObj);
  });
});

function renderOneToy(toy) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p><span>${toy.likes}</span> Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;

  card.querySelector(".like-btn").addEventListener("click", () => {
    likes(toy.id, toy.likes + 1);
  });

  document.querySelector("#toy-collection").appendChild(card);
}

function getAllToys() {
  fetch("http://localhost:3000/toys")
   .then((response) => response.json())
   .then((toyData) => toyData.forEach((toy) => renderOneToy(toy)));
}

function addToy(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toyObj),
  })
   .then((response) => response.json())
   .then((toy) => renderOneToy(toy));
}

function likes(toyId, likes) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ likes }),
  })
   .then((response) => response.json())
   .then((toy) => {
      const card = document.querySelector(`#toy-collection >.card >.like-btn[id="${toyId}"]`).parentNode;
      card.querySelector("span").textContent = toy.likes;
    });
}

function initialize() {
  getAllToys();
}

document.addEventListener("DOMContentLoaded", initialize);