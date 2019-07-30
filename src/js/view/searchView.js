
import { elements } from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => elements.searchInput.value = '';
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}


const limitRecipeTitle = (title, limit = 20) => {
    const newTitle = [];
 if(title.length > limit){
     title.split('').reduce((acc, cur) => {
       if(acc + cur.length <= limit){ 
           newTitle.push[cur];
       }
        return acc + cur.length;

      }, );
       return `${newTitle.join('')} ...`;

      }  
       return title;
}



const renderRecipe = recipe => {
    var $;
    const markup = `
    <ul class="results__list">
       <li>
          <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title, 20)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                       </div>
                  </a>
            </li>
          </u>
      `; 
   elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => `<button class="btn-inline results__btn--prev">
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-left"></use>
</svg>
<span>Page 1</span>
</button>
<button class="btn-inline results__btn--next">
<span>Page 3</span>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-right"></use>
</svg>
</button>`;

const renderButton = (page, numResults, resPerPage) =>{
    const pages = numResults / resPerPage;
    if(page === 1){
        //the button to go to next page

    } else if(page < pages && pages > 1){
        //both buttons
    }
    
    else if(page === pages && pages > 1){

    }
};
    export const renderRsults = (recipes, page = 1, resPerPage = 10) => {  
    const start = (page - 1) * resPerPage;
    const end = Math.ceil(page * resPerPage);

    recipes.slice(start, end).forEach(renderRecipe);
};