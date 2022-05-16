function hideTags(arrayOfItems){
    arrayOfItems.forEach(item => {
        item.classList.add('none')
    })
}

function displayOnlyRemainingTags(itemsFiltred, arrayOfItems){
    arrayOfItems.forEach(item => {
        console.log(item)
        if(itemsFiltred.includes(item.innerHTML)){
            item.classList.remove('none')
        }
    })
}