//fonction d'init pour initialiser toutes nos fonctions
async function init() {
  // Récupère les datas du photographe
  const api = new Api("/data/recipes.json");
  const recipes = await api.get();

//   displayRecipes(recipes);
}

init();
