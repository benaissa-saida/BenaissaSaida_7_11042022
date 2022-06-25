async function init() {
  const api = new Api("/data/recipes.json");
  const data = await api.get();
  const dataFetched = new FetchData(data);

  const recipes = dataFetched.getRecipes();
  const tablesForRecipes = buildTableForSearchingRecipes(recipes);

  new HomeBuilder(recipes, tablesForRecipes).render();

  // const testUserRequest = {
  //   input: "choco",
  //   tags: "sucre beurre",
  // };

  // function testAlgoPerformance() {
  //   for (let i = 0; i < 100000; i++) {
  //     recipes.search(testUserRequest, tablesForRecipes)
  //   }
  // }

  // function testAlgo2Performance() {
  //   for (let i = 0; i < 100000; i++) {
  //     recipes.searchSecondAlgo(testUserRequest, tablesForRecipes)
  //   }
  // }

  // console.time('algo1');
  // testAlgoPerformance();
  // console.timeEnd('algo1');
  // console.time('algo2');
  // testAlgo2Performance();
  // console.timeEnd('algo2');
}
init();
