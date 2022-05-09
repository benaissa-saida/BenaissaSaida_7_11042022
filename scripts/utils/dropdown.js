const containerIngredient = document.getElementById("container-ingredient");
const containerAppareil = document.getElementById("container-appareil");
const containerUstensil = document.getElementById("container-ustensil");

const toggleIngredient = document.querySelector("#toggle-ingredient");
const toggleAppareil = document.getElementById("toggle-appareil");
const toggleUstensil = document.getElementById("toggle-ustensil");

const arrowUpIngredient = document.getElementById("arrowUp-ingredient");
const arrowUpAppareil = document.getElementById("arrowUp-appareil");
const arrowUpUstensil = document.getElementById("arrowUp-ustensil");

const inputIngredient = document.getElementById("input-ingredient");
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

arrowUpIngredient.addEventListener("click", function closeDrop() {
  isDropDownOpen = false;
  toggleIngredient.classList.remove("none");
  inputIngredient.classList.add("none");
  containerIngredient.classList.remove("w-50");
});
arrowUpAppareil.addEventListener("click", function closeDrop() {
  isDropDownOpen = false;
  toggleAppareil.classList.remove("none");
  inputAppareil.classList.add("none");
  containerAppareil.classList.remove("w-50");
});
arrowUpUstensil.addEventListener("click", function closeDrop() {
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
      return listNotFiltered.push(
        capitalizeFirstLetter(ingredients.ingredient)
      );
    });
  }
  //Utilisation de la methode Set pour ne pas avoir de doublons.
  const listOfAllIngredients = [...new Set(listNotFiltered)];
  listOfAllIngredients.forEach((ingredient) => {
    return (ingredientList.innerHTML += `<li class="text-truncate fs-5 list" title="${ingredient}">${ingredient}</li>`);
  });
}

async function displayAppareils(recipes) {
  const appareilList = document.getElementById("appareils-list");
  const listNotFiltered = [];

  for (const recipe of recipes) {
    listNotFiltered.push(recipe.appliance);
  }
  //Utilisation de la methode Set pour ne pas avoir de doublons.
  const listOfAllAppareils = [...new Set(listNotFiltered)];
  listOfAllAppareils.forEach((appliance) => {
    return (appareilList.innerHTML += `<li class="text-truncate fs-5 list" title="${appliance}">${appliance}</li>`);
  });
}

async function displayUstensils(recipes) {
  const ustensilList = document.getElementById("ustensils-list");
  const listNotFiltered = [];

  for (const recipe of recipes) {
    recipe.ustensils.forEach((ustensils) => {
      return listNotFiltered.push(capitalizeFirstLetter(ustensils));
    });
  }
  //Utilisation de la methode Set pour ne pas avoir de doublons.
  const listOfAllUstensils = [...new Set(listNotFiltered)];
  listOfAllUstensils.forEach((ustensil) => {
    return (ustensilList.innerHTML += `<li class="text-truncate fs-5 list" title="${ustensil}">${ustensil}</li>`);
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayTagAfterClickLi() {
  const arrayOfCrossTags = [];
  const tagsContainerSelected = document.querySelector(".selected-tag");
  const arrayOfItems = [...document.querySelectorAll(".list")];
  arrayOfItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const parentOfTag = e.target.parentNode.id
      e.preventDefault();
      function btnInTag(nameOfParent, color) {
        if (parentOfTag.includes(nameOfParent)) {
          tagsContainerSelected.insertAdjacentHTML(
            "afterbegin",
            `<button class="d-flex justify-content-around align-items-center btn-tag ${color} me-2">
        <p class='tag-text'>${e.target.innerHTML}</p>
        <img src="assets/close.svg" class="cross-tag" alt="Supprimer le tag"/>
      </button>`
          );
          // document.querySelector(".btn-tag").style.backgroundColor = color;
          arrayOfCrossTags.push(document.querySelector(".cross-tag"));
        }
      }

      btnInTag("ingredients", "bg-blue");
      btnInTag("appareils", "bg-green");
      btnInTag("ustensils", "bg-red");
      closeTagAfterClickCross(arrayOfCrossTags);
    });
  });
}

function closeTagAfterClickCross(arrayOfCrossTags) {
  arrayOfCrossTags.forEach((cross) => {
    cross.addEventListener("click", (e) => {
      e.target.parentNode.remove()
    });
  });
}
