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

//Extrait les mots clès des recettes. 
function extractKeywords(recipe) {
  let keywordsSearchBar = `${recipe.nameOfRecipes} ${recipe.ingredientsOfRecipes} ${recipe.descriptionOfRecipes}`;
  let keywordsTags = `${recipe.ingredientsOfRecipes} ${recipe.appareilOfRecipes} ${recipe.ustensilsOfRecipes}`
  keywords = {
    searchBar: keywordsSearchBar.split(" "),
    tags: keywordsTags.split(" ")
  };
  return keywords;
}

//Ajoute les recettes en fonction des mots clès. 
function addRecipesToTable(recipe, recipesKeywords, tableForRecipes) {
  for (let keyword of recipesKeywords.searchBar) {
    // console.log(keyword)
    for (let i = 1; i <= keyword.length; i++) {
      //coupe le tableau de mots clés pour permettre la recherche de chaque mots dans la table de recette
      const troncatedKeyword = keyword.slice(0, i);
      const searchBar = tableForRecipes.searchBar
      if (troncatedKeyword in searchBar) {
        //si une suite de mot est trouvée alors ajouter la recette pour chaque mot clé. 
        searchBar[troncatedKeyword].add(recipe);
      } else {
        // sinon il y a création d'un nouveau tableau dans la table  
        searchBar[troncatedKeyword] = new Set([recipe]);
      }
    }
  }
  for (let keyword of recipesKeywords.tags) {
    // console.log(keyword)
    for (let i = 1; i <= keyword.length; i++) {
      //coupe le tableau de mots clés pour permettre la recherche de chaque mots dans la table de recette
      const troncatedKeyword = keyword.slice(0, i);
      const tags = tableForRecipes.tags
      if (troncatedKeyword in tags) {
        //si une suite de mot est trouvée alors ajouter la recette pour chaque mot clé. 
        tags[troncatedKeyword].add(recipe);
      } else {
        // sinon il y a création d'un nouveau tableau dans la table  
        tags[troncatedKeyword] = new Set([recipe]);
      }
    }
  }
  return tableForRecipes;
}

//Construit un objet qui pourra ainsi contenir tous les mots clès potentiel des recettes
function buildTableForSearchingRecipes(recipesList) {
  let tableForRecipes = {
    searchBar: {},
    tags: {}
  };
  for (let recipe of recipesList.recipes) {
    const recipesKeywords = extractKeywords(recipe);
    tableForRecipes = addRecipesToTable(
      recipe,
      recipesKeywords,
      tableForRecipes
    );
  }
  return tableForRecipes;
}

function normalizeValuesByRemovingAccents(str){
  let result = str.toLowerCase();
  non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
  for (i in non_asciis) { result = result.replace(new RegExp(non_asciis[i], 'g'), i); }
  return result;
};

function sortArrayAlphabetically(array){
  return array.sort((a, b) => a.localeCompare(b))
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
