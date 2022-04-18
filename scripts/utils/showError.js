function showMessageError(){
    const body = document.querySelector('.recipes');
    body.innerHTML = `<h1 class="text-center">Oups</h1>
    <p class="text-center fs-4">Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</p>`
}