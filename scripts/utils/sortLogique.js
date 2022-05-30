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
    nameList.push(this.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
    const nameArray = nameList.join(" ");
    return nameArray;
  }

  get ingredientsOfRecipes() {
    const ingredientsList = [];
    for (let item of this.ingredients) {
      ingredientsList.push(
        item.ingredient.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      );
    }
    const ingredientsArray = ingredientsList.join(" ");
    return ingredientsArray;
  }

  get appareilOfRecipes() {
    const appareilsList = [];
    appareilsList.push(
      this.appliance.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
    const appareilArray = appareilsList.join(" ");
    return appareilArray;
  }

  get ustensilsOfRecipes() {
    const ustensilsList = [];
    for (let item of this.ustensils) {
      ustensilsList.push(
        capitalizeFirstLetter(
          item.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        )
      );
    }
    const ustensilsArray = ustensilsList.join(" ");
    return ustensilsArray;
  }

  get descriptionOfRecipes() {
    const descriptionList = [];
    descriptionList.push(
      this.description.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );
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
    return [...ingredients];
  }
  get allAppareils() {
    const appareil = new Set();
    for (let recipe of this.recipes) {
      appareil.add(capitalizeFirstLetter(recipe.appliance));
    }
    return [...appareil];
  }
  get allUstensils() {
    const ustensils = new Set();
    for (let recipe of this.recipes) {
      for (let ustensil of recipe.ustensils)
        ustensils.add(capitalizeFirstLetter(ustensil));
    }
    return [...ustensils];
  }

  search(userDemand, tableForRecipes) {
    userDemand = `${userDemand.input} ${userDemand.tags}`;

    const keywords = userDemand.trim().split(" ");
    let filteredRecipes = new Set(this.recipes);
    for (let keyword of keywords) {
      keyword = keyword.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      let keywordsInRecipes;
      if (keyword in tableForRecipes) {
        keywordsInRecipes = tableForRecipes[keyword];
      } else {
        keywordsInRecipes = new Set();
      }
      filteredRecipes = new Set(
        [...keywordsInRecipes].filter((recipe) => filteredRecipes.has(recipe))
      );
    }

    return new ListOfRecipes([...filteredRecipes]);
  }
}
