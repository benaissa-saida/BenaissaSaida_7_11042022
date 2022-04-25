const toggleIngredient = document.getElementById("toggle-ingredient");
const toggleAppareil = document.getElementById("toggle-appareil");
const toggleUstensil = document.getElementById("toggle-ustensil");

const toggle = document.querySelector('.toggle')

const inputIngredient = document.getElementById("input-ingredient");
const inputAppareil = document.getElementById("input-appareil");
const inputUstensil = document.getElementById("input-ustensil");
isDropDownOpen = false;

const openDrop = (toggle, input) => {
    console.log('open')
  isDropDownOpen = true;
  toggle.classList.add("none");
  input.classList.remove("none");
};

//fonction pour fermer notre toggle de filtre
const closeDrop = (toggle, input) => {
  isDropDownOpen = false;
  toggle.classList.remove("none");
  input.classList.add("none");
};

// toggleIngredient.addEventListener('click', console.log('openIngredient'))
// toggleAppareil.addEventListener('click', console.log('openAppareil'))
// toggleUstensil.addEventListener('click', console.log('openUstensil'))

toggle.addEventListener('click', console.log('toggletest'))

// inputIngredient.addEventListener('click', closeDrop(toggleIngredient, inputIngredient))
// inputAppareil.addEventListener('click', closeDrop(toggleAppareil, inputAppareil))
// inputUstensil.addEventListener('click', closeDrop(toggleUstensil, inputUstensil))
