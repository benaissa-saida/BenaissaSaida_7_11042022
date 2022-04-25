//fonction permettant de gérer  les mécanismes de création des cards
function cardFactory(data) {
  // création de constantes contenus dans la data
  const {
    name,
    id,
    appliance,
    description,
    ingredients,
    servings,
    time,
    ustensils,
  } = data;

  //fonction de création d'une card recette
  function getRecipesCardDOM(ingredientsInfo) {
    const article = document.querySelector(".cards__container");
    article.innerHTML += `
        <div class="col">
            <div class="card cardTest">
                <img
                class="card-img-top bg-silver recipes__picture rounded-top"
                />
                <div class="card-body bg-gray">
                    <div
                        class="top d-flex justify-content-between align-items-center"
                    >
                        <h2 class="fs-5 fw-normal">${name}</h2>
                        <p
                        class="d-flex justify-content-center align-items-center fs-5 fw-bold"
                        >
                        <span class="pe-2">
                            <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
                                fill="black"
                            />
                            </svg>
                        </span>
                        ${time}
                        </p>
                    </div>
                    <div class="row row-cols-2 pb-4 card__footer">
                        <ul class="list-unstyled">
                            ${ingredientsInfo}
                        </ul>
                        <p class="card__footer--description">
                        ${description}
                        </p>
                    </div>
                </div>
            </div>
        </div>`;
  }

    function ingredientOnly(ingredient){
      return `<li><span class="fw-bold">${ingredient.ingredient}</span></li>`
    }

    function ingredientWithQuantity(ingredient){
      return `<li><span class="fw-bold">${ingredient.ingredient}</span>: ${ingredient.quantity}</li>`
    }

    function ingredientWithQuantityAndUnit(ingredient){
      return `<li><span class="fw-bold">${ingredient.ingredient}</span>: ${ingredient.quantity} ${ingredient.unit}</li>`
    }

  //fonction pour avoir les infos d'un ingrédient
  function getAllRecipes() {
    let ingredientsInfo = "";
    ingredients.forEach((ingredient) => {
      if (ingredient.quantity && ingredient.unit) {
        ingredientsInfo += ingredientWithQuantityAndUnit(ingredient)
      } else if (ingredient.quantity) {
        ingredientsInfo += ingredientWithQuantity(ingredient)
      } else {
        ingredientsInfo += ingredientOnly(ingredient)
      }
    });
    return getRecipesCardDOM(ingredientsInfo);
  }

  //on retourne les fonctions afin de pouvoir la réutiliser
  return { getRecipesCardDOM, getAllRecipes };
}
