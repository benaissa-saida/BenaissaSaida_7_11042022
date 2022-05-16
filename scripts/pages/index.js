async function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    const cardModel = cardFactory(recipe);
    return cardModel.getAllRecipes();
  });
}

function refreshRecipes(recipes, restOfRecipes, arrayOfItems, item){
  sortItems(arrayOfItems, item)
  recipes.forEach(recipe => {
    const elements = recipe.firstChild.nextElementSibling.nextElementSibling.innerHTML;
    if(!elements.includes(item)){
      recipe.remove()
    }
  })
  const items = sortItems(arrayOfItems, item);
  console.log(items)
  refreshDropDown(items, arrayOfItems)
  //faire un tableau de tri par rapport aux données des ustensils, appareils, et ingredients
  //comme pour les tri dans le projet 6 avant d'envoyer les données dans le tableau restOfRecipes

  // if(recipe.className !== 'none'){
  //   restOfRecipes.push(recipe)
  // }
}

function refreshDropDown(items, arrayOfItems){
  hideTags(arrayOfItems)
  displayOnlyRemainingTags(items, arrayOfItems)
}

function displayTagAfterClickLi(arrayOfItems) {
  const arrayOfCrossTags = [];
  const allRecipes = [...document.querySelectorAll('.card')]
  const tagsContainerSelected = document.querySelector(".selected-tag");
  // const arrayOfItems = [...document.querySelectorAll(".list")];
  const restOfRecipes = []
  arrayOfItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const idOfParentTag = e.target.parentNode.id;
      e.preventDefault();
      function bgInTag(idOfParent, color) {
        if (idOfParentTag.includes(idOfParent)) {
          // une façon plus rapide et plus direct que le innerHtml (supprime mieux les tags)
          tagsContainerSelected.insertAdjacentHTML(
            "afterbegin",
            `<button class="d-flex justify-content-around align-items-center btn-tag ${color} me-2">
              <p class='tag-text'>${e.target.innerHTML}</p>
              <img src="assets/close.svg" class="cross-tag" alt="Supprimer le tag"/>
            </button>`
          );
          arrayOfCrossTags.push(document.querySelector(".cross-tag"));
        }
      }

      refreshRecipes(allRecipes, restOfRecipes, arrayOfItems, e.target.innerHTML)

      bgInTag("ingredients", "bg-blue");
      bgInTag("appareils", "bg-green");
      bgInTag("ustensils", "bg-red");
      closeTagAfterClickCross(arrayOfCrossTags);
    });
  });
}

function closeTagAfterClickCross(arrayOfCrossTags) {
  arrayOfCrossTags.forEach((cross) => {
    cross.addEventListener("click", (e) => {
      e.target.parentNode.remove();
    });
  });
}

//fonction d'init pour initialiser toutes nos fonctions
async function init() {
  // Récupère les datas des recettes
  const api = new Api("/data/recipes.json");
  const recipes = await api.get();

  displayRecipes(recipes);
  displayIngredients(recipes);
  displayAppareils(recipes);
  displayUstensils(recipes);

  const arrayOfItems = [...document.querySelectorAll(".list")];

  displayTagAfterClickLi(arrayOfItems);
  // showMessageError()
}

init();
