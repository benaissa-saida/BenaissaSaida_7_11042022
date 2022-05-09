async function displayRecipes(recipes) {
  // const cards = document.querySelector(".cards");
  //boucle qui va nous créer la card d'un photographe
  recipes.forEach((recipe) => {
    const cardModel = cardFactory(recipe);
    return cardModel.getAllRecipes();
    // cards.appendChild(allRecipes)
  });
}


//fonction d'init pour initialiser toutes nos fonctions
async function init() {
  // Récupère les datas du photographe
  const api = new Api("/data/recipes.json");
  const recipes = await api.get();

  displayRecipes(recipes);
  displayIngredients(recipes);
  displayAppareils(recipes);
  displayUstensils(recipes);
  displayTagAfterClickLi();
  // showMessageError()
}

init();
