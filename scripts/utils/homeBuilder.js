const filters = ["ingredients", "appareils", "ustensils"];

class HomeBuilder {
  constructor(recipes, tableForRecipes) {
    this.recipesList = recipes;
    this.tableForRecipes = tableForRecipes;
    this.listOfTags = [];
    this.itemsFiltered = {
      ingredients: this.recipesList.allIngredients,
      appareils: this.recipesList.allAppareils,
      ustensils: this.recipesList.allUstensils,
    };
  }

  get _userDemand() {
    let input = document.getElementById("search-input");
    return {
      input: input.value.trim(),
      tags: this.listOfTags.join(" ").trim(),
    };
  }

  displayRecipes() {
    return this.recipesList.search(this._userDemand, this.tableForRecipes);
  }

  displayListOfTags(recipesList) {
    return {
      ingredients: recipesList.allIngredients,
      appareils: recipesList.allAppareils,
      ustensils: recipesList.allUstensils,
    };
  }

  render() {
    this._displayFiltersOptions(this.itemsFiltered);
    this._displayCards(this.recipesList);
    this._searchWithInput();
    this._openDropdown();
    this._closeDropdownByClickingInArrow();
  }

  _displayFiltersOptions(items) {
    for (let filter of filters) {
      const itemsList = document.getElementById(`${filter}-list`);
      let contentHTML = "";
      for (let item of items[filter]) {
        contentHTML += `<li class="text-truncate fs-5 list">${item}</li>`;
      }
      itemsList.innerHTML = contentHTML;
    }
    this._displayTagAfterClickLi();
  }

  _displayCards(recipesList) {
    const cartContainer = document.querySelector(".cards__container");
    let contentHTML = "";
    for (let i = 0; i < recipesList.recipes.length; i++) {
      if (recipesList.recipes[i]) {
        contentHTML += new cardFactory(
          recipesList.recipes[i]
        ).getRecipesCardDOM();
      }
    }
    cartContainer.innerHTML = contentHTML;
  }

  _displayTagAfterClickLi() {
    const arrayOfCrossTags = [];
    const tagsContainerSelected = document.querySelector(".selected-tag");
    const liOfItems = [...document.querySelectorAll(".list")];
    let recipesToDisplay;
    for (let filter of filters) {
      const inputAboveLi = document.getElementById(`${filter}`);
      inputAboveLi.oninput = () => {
        let itemsList = {};
        Object.assign(itemsList, this.itemsFiltered);

        //Filtre l'objet pour que chaque item contenu dedans soit retrouvé grâce à la valeur de l'input
        itemsList[filter] = itemsList[filter].filter((item) =>
          normalizeValuesByRemovingAccents(item).startsWith(
            normalizeValuesByRemovingAccents(inputAboveLi.value)
          )
        );
        this._displayFiltersOptions(itemsList);
      };
    }

    liOfItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const idOfParentTag = e.target.parentNode.id;
        e.preventDefault();
        function bgInTag(listOfTags, idOfParent, color) {
          //si à la fois id du parent est inclus dans l'id du parent du tag et que l'innerHTML est inclus dans
          //ma liste de tags
          if (
            idOfParentTag.includes(idOfParent) &&
            !listOfTags.includes(e.target.innerHTML)
          ) {
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

        //permet de créer l'html du bouton de tag
        bgInTag(this.listOfTags, "ingredients", "bg-blue");
        bgInTag(this.listOfTags, "appareils", "bg-green");
        bgInTag(this.listOfTags, "ustensils", "bg-red");

        this._closeTagAfterClickCross(arrayOfCrossTags, e.target.innerHTML);

        //crée une variable recipesToDisplay pour rechercher chaque recette après chaque clique
        recipesToDisplay = this.displayRecipes();
        //crée de nouveau tags sous les filtres contenus seulement dans les recettes affichées.
        this._displayFiltersOptions(this.displayListOfTags(recipesToDisplay));
        //affiche les nouvelles cards de recettes.
        this._displayCards(recipesToDisplay);
        this._showMessageError(recipesToDisplay);
      });
    });
  }

  _closeTagAfterClickCross(arrayOfCrossTags, content) {
    let recipesToDisplay;
    this.listOfTags.push(content);
    arrayOfCrossTags.forEach((cross) => {
      cross.addEventListener("click", (e) => {
        e.target.parentNode.remove();
        //remet à jour notre list de tags après chaque suppression
        this.listOfTags = this.listOfTags.filter((elt) => elt != content);

        //si l'input est - de 3 caractère et tags vide
        if (this._userDemand.input.length < 3 && this._userDemand.tags == "") {
          //valeur de recipesToDisplay prends toutes les recettes
          recipesToDisplay = this.recipesList;
        } else {
          //sinon on va faire une nouvelle recherche des recettes pour avoir les recettes qui contiennent les mots clès
          recipesToDisplay = this.displayRecipes();
          this._showMessageError(recipesToDisplay);
        }

        //on affiche ensuite les tags qui sont seulements contenus dans nos recettes restantes
        this._displayFiltersOptions(this.displayListOfTags(recipesToDisplay));
        //avant d'afficher les cards
        this._displayCards(recipesToDisplay);
      });
    });
  }

  _showMessageError(recipesToDisplay) {
    const body = document.querySelector(".cards__container");

    const recipesQuantity = recipesToDisplay.recipes.length;

    if (recipesQuantity === 0) {
      return (body.innerHTML = `<h1 class="text-center">Oups</h1>
      <p class="text-center fs-4">Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.</p>`);
    }
  }

  _searchWithInput() {
    let input = document.getElementById("search-input");
    let searchIcon = document.getElementById("search-icon");

    //ferme les tags pour avoir seulement l'input
    input.onfocus = () => {
      //faire en sorte que ça ne bloque pas le bouton lorsqu'elle est appelé.
      this._closeDropDownNotActive();
    };

    input.oninput = () => {
      let recipesToDisplay;
      if(input.value.length >= 3){
        recipesToDisplay = this.displayRecipes()
        this._showMessageError(recipesToDisplay)
      } else if(this.listOfTags.length > 0){
        recipesToDisplay = this.recipesList.search({
          input: '',
          tags: this._userDemand.tags,
        }, this.tableForRecipes)
        this._showMessageError(recipesToDisplay)
      } else {
        recipesToDisplay = this.recipesList
      }

      //on affiche ensuite les tags qui sont seulements contenus dans nos recettes restantes
      this._displayFiltersOptions(this.displayListOfTags(recipesToDisplay));
      //avant d'afficher les cards
      this._displayCards(recipesToDisplay);
    }
    searchIcon.onclick = (e) => {
      e.preventDefault()
      input.blur()
    }
  }

  _closeDropDownNotActive(filterClicked) {
    for (let filter of filters) {
      if (filter !== filterClicked) {
        const container = document.getElementById(`container-${filter}`);
        const toggle = document.getElementById(`toggle-${filter}`);
        const inputContainer = document.getElementById(`input-${filter}`);

        toggle.classList.remove("none");
        inputContainer.classList.add("none");
        container.classList.remove("w-50");
      }
    }
  }

  _closeDropdownByClickingInArrow() {
    // const body = document.querySelector('body');
    for (let filter of filters) {
      const arrowUp = document.getElementById(`arrowUp-${filter}`);
      const container = document.getElementById(`container-${filter}`);
      const toggle = document.getElementById(`toggle-${filter}`);
      const inputContainer = document.getElementById(`input-${filter}`);

      arrowUp.addEventListener("click", (e) => {
        e.preventDefault();
        toggle.classList.remove("none");
        inputContainer.classList.add("none");
        container.classList.remove("w-50");
      });
    }
    // console.log(body)
    // //tenter aussi de faire le click outside
    // body.onclick = () => {
    //   //faire en sorte que ça ne bloque pas le bouton lorsqu'elle est appelé.
    //   this._closeDropDownNotActive();
    // };
  }

  _openDropdown() {
    for (let filter of filters) {
      const container = document.getElementById(`container-${filter}`);
      const toggle = document.getElementById(`toggle-${filter}`);
      const inputContainer = document.getElementById(`input-${filter}`);
      const input = document.getElementById(`${filter}`);
      const arrowUp = document.getElementById(`arrowUp-${filter}`);

      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        this._closeDropDownNotActive(filter);

        toggle.classList.toggle("none");
        inputContainer.classList.toggle("none");
        container.classList.toggle("w-50");
        input.focus();
      });
    }
  }
}
