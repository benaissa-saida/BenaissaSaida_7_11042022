class Recipes {
  constructor(
    name,
    id,
    appliance,
    description,
    ingredients,
    servings,
    time,
    ustensils
  ) {
    this.name = name;
    this.id = id;
    this.appliance = appliance;
    this.description = description;
    this.ingredients = ingredients;
    this.servings = servings;
    this.time = time;
    this.ustensils = ustensils;
  }

  get nameOfRecipes() {
    const nameList = [];
    nameList.push(normalizeValuesByRemovingAccents(this.name));
    const nameArray = nameList.join(" ");
    return nameArray;
  }

  get ingredientsOfRecipes() {
    const ingredientsList = [];
    for (let item of this.ingredients) {
      ingredientsList.push(normalizeValuesByRemovingAccents(item.ingredient));
    }
    const ingredientsArray = ingredientsList.join(" ");
    return ingredientsArray;
  }

  get appareilOfRecipes() {
    const appareilsList = [];
    appareilsList.push(normalizeValuesByRemovingAccents(this.appliance));
    const appareilArray = appareilsList.join(" ");
    return appareilArray;
  }

  get ustensilsOfRecipes() {
    const ustensilsList = [];
    for (let item of this.ustensils) {
      ustensilsList.push(normalizeValuesByRemovingAccents(item));
    }
    const ustensilsArray = ustensilsList.join(" ");
    return ustensilsArray;
  }

  get descriptionOfRecipes() {
    const descriptionList = [];
    descriptionList.push(normalizeValuesByRemovingAccents(this.description));
    const descriptionArray = descriptionList.join(" ");
    return descriptionArray;
  }
}

class ListOfRecipes {
  constructor(recipes) {
    this.recipes = recipes;
  }

  get allIngredients() {
    const ingredients = new Set();
    for (let recipe of this.recipes) {
      for (let item of recipe.ingredients)
        ingredients.add(capitalizeFirstLetter(item.ingredient));
    }
    return sortArrayAlphabetically([...ingredients]);
  }
  get allAppareils() {
    const appareil = new Set();
    for (let recipe of this.recipes) {
      appareil.add(capitalizeFirstLetter(recipe.appliance));
    }
    return sortArrayAlphabetically([...appareil]);
  }
  get allUstensils() {
    const ustensils = new Set();
    for (let recipe of this.recipes) {
      for (let ustensil of recipe.ustensils) {
        ustensils.add(capitalizeFirstLetter(ustensil));
      }
    }

    return sortArrayAlphabetically([...ustensils]);
  }

  search(userDemand, tablesForRecipes) {
    userDemand = `${userDemand.input} ${userDemand.tags}`;

    const keywords = userDemand.trim().split(" ");
    let filteredRecipes = new Set(this.recipes);
    for (let keyword of keywords) {
      keyword = normalizeValuesByRemovingAccents(keyword);
      let keywordsInRecipes;
      if (keyword in tablesForRecipes) {
        keywordsInRecipes = tablesForRecipes[keyword];
      } else {
        keywordsInRecipes = new Set();
      }
      filteredRecipes = new Set(
        [...keywordsInRecipes].filter((recipe) => filteredRecipes.has(recipe))
      );
    }

    return new ListOfRecipes([...filteredRecipes]);
  }
  searchSecondAlgo(userDemand, tablesForRecipes) {
    userDemand = `${userDemand.input} ${userDemand.tags}`;

    const keywords = userDemand.trim().split(" ");
    let filteredRecipes = new Set(this.recipes);
    keywords.forEach((keyword) => {
      keyword = normalizeValuesByRemovingAccents(keyword);
      let keywordsInRecipes;
      if (keyword in tablesForRecipes) {
        keywordsInRecipes = tablesForRecipes[keyword];
      } else {
        keywordsInRecipes = new Set();
      }
      filteredRecipes = new Set(
        [...keywordsInRecipes].filter((recipe) => filteredRecipes.has(recipe))
      );
    });
    return new ListOfRecipes([...filteredRecipes]);
  }
}
