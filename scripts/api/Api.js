class Api{
    /** //donne une précision sur la nature de l'url
     * @param {string} url
     */
    constructor(url){
        this._url = url
    }

    //fonction pour avoir toutes les recettes
    async get(){
        return fetch(this._url)
        .then(res => res.json())
        .then(data => data.recipes)
        .catch(err => console.log('une erreur est apparue', err))
    }
    
}
