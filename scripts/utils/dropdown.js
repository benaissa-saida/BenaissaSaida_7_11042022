const containerIngredient = document.getElementById("container-ingredient");
const containerAppareil = document.getElementById("container-appareil");
const containerUstensil = document.getElementById("container-ustensil");


const toggleIngredient = document.querySelector("#toggle-ingredient");
const toggleAppareil = document.getElementById("toggle-appareil");
const toggleUstensil = document.getElementById("toggle-ustensil");

const inputIngredient = document.querySelector("#input-ingredient");
const inputAppareil = document.getElementById("input-appareil");
const inputUstensil = document.getElementById("input-ustensil");
isDropDownOpen = false;

toggleIngredient.addEventListener("click", function openDrop() {
  isDropDownOpen = true;
  toggleIngredient.classList.add("none");
  inputIngredient.classList.remove("none");
  containerIngredient.classList.add("w-50");
});
toggleAppareil.addEventListener("click", function openDrop() {
  isDropDownOpen = true;
  toggleAppareil.classList.add("none");
  inputAppareil.classList.remove("none");
  containerAppareil.classList.add("w-50");
});
toggleUstensil.addEventListener("click", function openDrop() {
  isDropDownOpen = true;
  toggleUstensil.classList.add("none");
  inputUstensil.classList.remove("none");
  containerUstensil.classList.add("w-50");
});

inputIngredient.addEventListener("click", function closeDrop() {
  isDropDownOpen = false;
  toggleIngredient.classList.remove("none");
  inputIngredient.classList.add("none");
  containerIngredient.classList.remove("w-50");
});
inputAppareil.addEventListener("click", function closeDrop() {
  isDropDownOpen = false;
  toggleAppareil.classList.remove("none");
  inputAppareil.classList.add("none");
  containerAppareil.classList.remove("w-50");
});
inputUstensil.addEventListener("click", function closeDrop() {
  isDropDownOpen = false;
  toggleUstensil.classList.remove("none");
  inputUstensil.classList.add("none");
  containerUstensil.classList.remove("w-50");
});


function displayIngredients(recipes) {
  const ingredientList = document.getElementById("ingredients-list");
  const listNotFiltered = [];

  for (const recipe of recipes) {
    recipe.ingredients.forEach((ingredients) => {
      return listNotFiltered.push(ingredients.ingredient);
    });
  }
  //Utilisation de la methode Set pour ne pas avoir de doublons.
  const listOfAllIngredients = [...new Set(listNotFiltered)];
  listOfAllIngredients.forEach((ingredient) => {
    return ingredientList.innerHTML += `<li class="text-truncate fs-5" title="${ingredient}">${ingredient}</li>`;
  });
}

async function displayAppareils(recipes) {
  const appareilList = document.getElementById("appareils-list");
  const listNotFiltered = [];

  for (const recipe of recipes) {
    console.log(recipe)
    
    listNotFiltered.push(recipe.appliance);
    
  }
  //Utilisation de la methode Set pour ne pas avoir de doublons.
  const listOfAllAppareils = [...new Set(listNotFiltered)];
  listOfAllAppareils.forEach((appliance) => {
    return appareilList.innerHTML += `<li class="text-truncate fs-5" title="${appliance}">${appliance}</li>`;
  });
}

async function displayUstensils(recipes) {
  const ustensilList = document.getElementById("ustensils-list");
  const listNotFiltered = [];

  for (const recipe of recipes) {
    console.log(recipe)
    recipe.ustensils.forEach((ustensils) => {
      return listNotFiltered.push(capitalizeFirstLetter(ustensils));
    });
    console.log(listNotFiltered)
    // recipe.ingredients.forEach((ingredients) => {
    //   return listNotFiltered.push(ingredients.ingredient);
    // });
  }
  //Utilisation de la methode Set pour ne pas avoir de doublons.
  const listOfAllUstensils = [...new Set(listNotFiltered)];
  listOfAllUstensils.forEach((ustensil) => {
    return ustensilList.innerHTML += `<li class="text-truncate fs-5" title="${ustensil}">${ustensil}</li>`;
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
