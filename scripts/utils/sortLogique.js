function sortItems(lists, item) {
  let items = [];
  let restOfItems = [];

  lists.filter((itemInList) => {
    if (itemInList.innerText !== item) {
      items.push(itemInList.innerText);
    }
  });
  return items;
}
