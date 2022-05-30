class FetchData {
  constructor(data) {
    this._data = data;
  }

  getRecipes() {
    const recipes = [];

    for (let recipe of this._data) {
      recipes.push(
        new Recipes(
          recipe.name,
          recipe.id,
          recipe.appliance,
          recipe.description,
          recipe.ingredients,
          recipe.servings,
          recipe.time,
          recipe.ustensils
        )
      );
    }
    return new ListOfRecipes(recipes)
  }
}

function extractKeywords(recipe) {
  let keywords = `${recipe.nameOfRecipes} ${recipe.ingredientsOfRecipes} ${recipe.appareilOfRecipes} ${recipe.ustensilsOfRecipes} ${recipe.descriptionOfRecipes}`;
  keywords = keywords.split(" ");
  return keywords;
}

function addKeywordsToTable(recipe, recipesKeywords, tableForRecipes) {
  for (let keyword of recipesKeywords) {
    for (let i = 1; i <= keyword.length; i++) {
      //coupe le tableau de mots clés pour permettre la recherche de chaque mots dans la table de recette
      const troncatedKeyword = keyword.slice(0, i);
      if (troncatedKeyword in tableForRecipes) {
        //si une suite de mot est trouvée alors ajouter la recette pour chaque mot clé. 
        tableForRecipes[troncatedKeyword].add(recipe);
      } else {
        //sinon il y a création d'un nouveau tableau dans la table  
        tableForRecipes[troncatedKeyword] = new Set([recipe]);
      }
    }
  }
  return tableForRecipes;
}

function buildTableForSearchingRecipes(recipesList) {
  let tableForRecipes = {};
  for (let recipe of recipesList.recipes) {
    const recipesKeywords = extractKeywords(recipe);
    tableForRecipes = addKeywordsToTable(
      recipe,
      recipesKeywords,
      tableForRecipes
    );
  }
  // console.log(tableForRecipes)
  return tableForRecipes;
}
