// async function displayRecipes(recipes) {
//   recipes.forEach((recipe) => {
//     const cardModel = cardFactory(recipe);
//     return cardModel.getAllRecipes();
//   });
// }

// function homeBuilder(recipes, tableForRecipes) {
//   constructor(recipes, tableForRecipes);
//   function constructor(recipes, tableForRecipes) {
//     // this.listOfRecipes = recipes;
//     this.tableForRecipes = tableForRecipes;
//     this.listOfTags = [];
//     this.itemsFiltered = {
//       ingredients: listOfRecipes(recipes).getIngredients(),
//       appareils: listOfRecipes(recipes).getAppareils(),
//       ustensils: listOfRecipes(recipes).getUstensils(),
//     };
//   }

//   async function displayRecipes(recipes) {
//     recipes.forEach((recipe) => {
//       const cardModel = cardFactory(recipe);
//       return cardModel.getAllRecipes();
//     });
//   }
// }

// function refreshRecipes(
//   recipes,
//   restOfRecipes,
//   arrayOfItems,
//   item,
//   tagsSelected
// ) {
//   const items = sortItems(arrayOfItems, item, tagsSelected);
//   recipes.forEach((recipe) => {
//     const elements =
//       recipe.firstChild.nextElementSibling.nextElementSibling.innerHTML;
//     if (!elements.includes(item)) {
//       recipe.remove();
//     }
//   });
//   console.log(items);

//   // refreshDropDown(items, arrayOfItems)
//   //faire un tableau de tri par rapport aux données des ustensils, appareils, et ingredients
//   //comme pour les tri dans le projet 6 avant d'envoyer les données dans le tableau restOfRecipes

//   // if(recipe.className !== 'none'){
//   //   restOfRecipes.push(recipe)
//   // }
// }

// function refreshDropDown(items, arrayOfItems) {
//   // hideTags(arrayOfItems)
//   displayOnlyRemainingTags(items, arrayOfItems);
//   // hideSelectedTags(arrayOfItems)
// }

// function displayTagAfterClickLi(items) {
//   const arrayOfCrossTags = [];
//   const allRecipes = [...document.querySelectorAll(".card")];
//   const tagsContainerSelected = document.querySelector(".selected-tag");
//   const liOfItems = [...document.querySelectorAll(".list")];
//   const tagsSelected = [];
//   const restOfRecipes = [];
//   liOfItems.forEach((item) => {
//     item.addEventListener("click", (e) => {
//       const idOfParentTag = e.target.parentNode.id;
//       e.preventDefault();
//       function bgInTag(idOfParent, color) {
//         if (idOfParentTag.includes(idOfParent)) {
//           // une façon plus rapide et plus direct que le innerHtml (supprime mieux les tags)
//           tagsContainerSelected.insertAdjacentHTML(
//             "afterbegin",
//             `<button class="d-flex justify-content-around align-items-center btn-tag ${color} me-2">
//               <p class='tag-text'>${e.target.innerHTML}</p>
//               <img src="assets/close.svg" class="cross-tag" alt="Supprimer le tag"/>
//             </button>`
//           );
//           arrayOfCrossTags.push(document.querySelector(".cross-tag"));
//         }
//       }

//       tagsSelected.push(e.target.innerHTML);

//       refreshRecipes(
//         allRecipes,
//         restOfRecipes,
//         items,
//         e.target.innerHTML,
//         tagsSelected
//       );

//       bgInTag("ingredients", "bg-blue");
//       bgInTag("appareils", "bg-green");
//       bgInTag("ustensils", "bg-red");
//       closeTagAfterClickCross(arrayOfCrossTags);
//     });
//   });
// }

// function closeTagAfterClickCross(arrayOfCrossTags) {
//   arrayOfCrossTags.forEach((cross) => {
//     cross.addEventListener("click", (e) => {
//       e.target.parentNode.remove();
//     });
//   });
// }

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// //fonction d'init pour initialiser toutes nos fonctions
// async function init() {
//   // Récupère les datas des recettes
//   const api = new Api("/data/recipes.json");
//   const recipesData = await api.get();
//   let ingredientNotFiltered = [];
//   let ingredients = [];
//   let appareilNotFiltered = [];
//   let appareils = [];
//   let ustensilNotFiltered = [];
//   let ustensils = [];

//   const recipes = [];

//   for (const recipe of recipesData) {
//     recipe.ingredients.forEach((ingredients) => {
//       return ingredientNotFiltered.push(
//         capitalizeFirstLetter(
//           ingredients.ingredient
//             .normalize("NFD")
//             .replace(/[\u0300-\u036f]/g, "")
//         )
//       );
//     });
//     appareilNotFiltered.push(capitalizeFirstLetter(recipe.appliance));
//     recipe.ustensils.forEach((ustensils) => {
//       return ustensilNotFiltered.push(
//         capitalizeFirstLetter(
//           ustensils.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
//         )
//       );
//     });

//     recipes.push(new Recipes(recipe));
//   }
//   ingredients = [...new Set(ingredientNotFiltered)];
//   appareils = [...new Set(appareilNotFiltered)];
//   ustensils = [...new Set(ustensilNotFiltered)];
//   // console.log(recipes)

//   // displayRecipes(recipes);

//   const arrayOfItems = {
//     ingredients: ingredients,
//     appareils: appareils,
//     ustensils: ustensils,
//   };
//   // console.log(listOfRecipes(recipes).getIngredients())

//   const tableForRecipes = buildTableForSearchingRecipes(recipes);
//   HomeBuilder(recipes, tableForRecipes);

//   displayFiltersOptions(arrayOfItems);
//   // buildTableForSearchingRecipes(recipes)

//   displayTagAfterClickLi(arrayOfItems);
//   // showMessageError()
// }

// init();

// import { Recipes } from "../utils/sortLogique";
async function init() {
  const api = new Api("/data/recipes.json");
  const data = await api.get();
  // console.log(data)
  const dataFetched = new FetchData(data);
  let input = document.getElementById("search-input");

  console.log(input)

  const recipes = dataFetched.getRecipes();
  const tablesForRecipes = buildTableForSearchingRecipes(recipes);

  new HomeBuilder(recipes, tablesForRecipes).render();
}
init();

// class fetchData {
//   constructor(data) {
//     this._data = data;
//   }

//   getRecipes() {
//     const recipes = [];

//     for (let recipe of this._data) {
//       recipes.push(
//         new Recipes(
//           recipe.name,
//           recipe.id,
//           recipe.appliance,
//           recipe.description,
//           recipe.ingredients,
//           recipe.servings,
//           recipe.time,
//           recipe.ustensils
//         )
//       );
//     }
//   }
// }
